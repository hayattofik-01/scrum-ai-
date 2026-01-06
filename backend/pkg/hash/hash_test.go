package hash

import "testing"

func TestPasswordHashing(t *testing.T) {
	password := "secure-password"

	hash, err := HashPassword(password)
	if err != nil {
		t.Fatalf("Failed to hash password: %v", err)
	}

	if hash == password {
		t.Error("Hash should not be equal to password")
	}

	if !CheckPasswordHash(password, hash) {
		t.Error("Password check failed for correct password")
	}

	if CheckPasswordHash("wrong-password", hash) {
		t.Error("Password check succeeded for incorrect password")
	}
}
