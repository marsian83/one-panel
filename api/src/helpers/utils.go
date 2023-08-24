package helpers

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"errors"
	"fmt"
)

func EncryptAES(key, iv, plaintext []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	paddedPlaintext := padPlaintext(plaintext, aes.BlockSize)

	ciphertext := make([]byte, len(paddedPlaintext))

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext, paddedPlaintext)

	return ciphertext, nil
}

func DecryptAES(key, iv, ciphertext []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	if len(ciphertext) < aes.BlockSize {
		return nil, errors.New("ciphertext too short")
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	decrypted := make([]byte, len(ciphertext))
	mode.CryptBlocks(decrypted, ciphertext)

	fmt.Println("sometimes fine", string(decrypted))

	// Remove padding
	padSize := int(decrypted[len(decrypted)-1])
	if padSize > aes.BlockSize || padSize > len(decrypted) {
		return nil, errors.New("invalid padding size")
	}
	decrypted = decrypted[:len(decrypted)-padSize]

	return decrypted, nil
}

func padPlaintext(plaintext []byte, blockSize int) []byte {
	padding := blockSize - (len(plaintext) % blockSize)
	paddedPlaintext := append(plaintext, bytes.Repeat([]byte{byte(padding)}, padding)...)
	return paddedPlaintext
}
