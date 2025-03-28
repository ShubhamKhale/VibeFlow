package controllers

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"net/http"
	"vibeflow-go-gin-application/helpers"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/nfnt/resize"
)

// DownloadImage downloads an image from a given URL into memory
func DownloadImage(url string) (image.Image, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	contentType := resp.Header.Get("Content-Type")
	var img image.Image
	switch contentType {
	case "image/jpeg":
		img, err = jpeg.Decode(resp.Body)
	case "image/png":
		img, err = png.Decode(resp.Body)
	default:
		return nil, fmt.Errorf("unsupported image format: %s", contentType)
	}
	if err != nil {
		return nil, err
	}

	// Handle transparency for PNG images by drawing onto a white background
	if contentType == "image/png" {
		if rgba, ok := img.(*image.NRGBA); ok {
			whiteBg := image.NewRGBA(rgba.Bounds())
			draw.Draw(whiteBg, whiteBg.Bounds(), &image.Uniform{C: image.White}, image.Point{}, draw.Src)
			draw.Draw(whiteBg, whiteBg.Bounds(), rgba, image.Point{}, draw.Over)
			return whiteBg, nil
		}
	}
	return img, nil
}

// CreateCollage creates a collage image in memory and returns a byte buffer
func CreateCollage(songs []string) (*bytes.Buffer, error) {
	n := len(songs)
	if n == 0 {
		return nil, fmt.Errorf("no songs to create collage")
	}

	// Load images into memory
	var images []image.Image
	for _, song := range songs {
		img, err := DownloadImage(song)
		if err != nil {
			return nil, fmt.Errorf("failed to download image: %v", err)
		}
		images = append(images, img)
	}

	// Define canvas dimensions
	width, height := 800, 800
	collage := image.NewRGBA(image.Rect(0, 0, width, height))

	// Draw images onto the collage
	switch n {
	case 1:
		resizedImg := resize.Resize(800, 800, images[0], resize.Lanczos3)
		draw.Draw(collage, collage.Bounds(), resizedImg, image.Point{}, draw.Src)
	default:
		for i := 0; i < n && i < 4; i++ {
			var rect image.Rectangle
			switch i {
			case 0:
				rect = image.Rect(0, 0, 400, 400)
			case 1:
				rect = image.Rect(400, 0, 800, 400)
			case 2:
				rect = image.Rect(0, 400, 400, 800)
			case 3:
				rect = image.Rect(400, 400, 800, 800)
			}

			// Resize the image to 400x400
			resizedImg := resize.Resize(400, 400, images[i], resize.Lanczos3)
			draw.Draw(collage, rect, resizedImg, image.Point{}, draw.Src)
		}
	}

	// Encode the collage to PNG format in memory
	var buffer bytes.Buffer
	if err := png.Encode(&buffer, collage); err != nil {
		return nil, fmt.Errorf("failed to encode collage: %v", err)
	}

	return &buffer, nil
}

// UploadToCloudinary uploads an image from a byte buffer to Cloudinary and returns the URL
func UploadToCloudinary(imageBuffer *bytes.Buffer) (string, error) {

	cloudinaryCloudName := helpers.GetEnv("cloudinary_cloud_name")
	cloudinaryKey := helpers.GetEnv("cloudinary_key")
	cloudinarySecret := helpers.GetEnv("cloudinary_secret")

	if cloudinaryCloudName == "" || cloudinaryKey == "" || cloudinarySecret == "" {
		return "", nil
	}

	cld, err := cloudinary.NewFromParams(cloudinaryCloudName, cloudinaryKey, cloudinarySecret)
	if err != nil {
		return "", fmt.Errorf("failed to create Cloudinary instance: %v", err)
	}

	// Upload the image directly from the byte buffer
	uploadResult, err := cld.Upload.Upload(context.TODO(), imageBuffer, uploader.UploadParams{
		ResourceType: "image",
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload image to Cloudinary: %v", err)
	}

	return uploadResult.SecureURL, nil
}
