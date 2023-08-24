package helpers

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"errors"

	"github.com/marsian83/one-panel/services/db_access/configs"
)

func EncryptAES(plaintext string) (string, error) {
	key := []byte(configs.Env.AES_key)

	// Create cipher block
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// Pad the plaintext to a multiple of the block size
	blockSize := block.BlockSize()
	plaintextBytes := []byte(plaintext)
	paddedPlaintext := padPlaintext(plaintextBytes, blockSize)

	// Create a new GCM block cipher for authenticated encryption
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	// Generate a random nonce
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return "", err
	}

	// Encrypt and append the nonce to the ciphertext
	ciphertext := aesGCM.Seal(nil, nonce, paddedPlaintext, nil)
	ciphertextWithNonce := append(nonce, ciphertext...)

	// Return the ciphertext as a hex-encoded string
	return hex.EncodeToString(ciphertextWithNonce), nil
}

func DecryptAES(ct string) (string, error) {
	key := []byte(configs.Env.AES_key)

	// Decode the hex-encoded ciphertext
	ciphertextWithNonce, err := hex.DecodeString(ct)
	if err != nil {
		return "", err
	}

	// Create cipher block
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// Create a new GCM block cipher for authenticated encryption
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	// Get the nonce size
	nonceSize := aesGCM.NonceSize()

	// Split the nonce and ciphertext
	nonce := ciphertextWithNonce[:nonceSize]
	ciphertext := ciphertextWithNonce[nonceSize:]

	// Decrypt the ciphertext
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	// Remove padding from the plaintext
	unpaddedPlaintext, err := unpadPlaintext(plaintext)
	if err != nil {
		return "", err
	}

	return string(unpaddedPlaintext), nil
}

func padPlaintext(plaintext []byte, blockSize int) []byte {
	padding := blockSize - (len(plaintext) % blockSize)
	paddedPlaintext := append(plaintext, bytes.Repeat([]byte{byte(padding)}, padding)...)
	return paddedPlaintext
}

func unpadPlaintext(paddedPlaintext []byte) ([]byte, error) {
	if len(paddedPlaintext) == 0 {
		return nil, errors.New("padded plaintext is empty")
	}

	padding := int(paddedPlaintext[len(paddedPlaintext)-1])
	if padding > len(paddedPlaintext) || padding > aes.BlockSize {
		return nil, errors.New("invalid padding size")
	}

	unpaddedPlaintext := paddedPlaintext[:len(paddedPlaintext)-padding]
	return unpaddedPlaintext, nil
}
