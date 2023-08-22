package configs

import (
	"log"

	"github.com/spf13/viper"
)

var Env *env

func InitEnvConfigs() {
	Env = loadEnvVariables()
}

type env struct {
	Mongodb_URI      string `mapstructure:"LOCAL_SERVER_PORT"`
	Mongodb_Hostname string `mapstructure:"SECRET_KEY"`
	Port             string `mapstructure:"PORT"`
}

func loadEnvVariables() (config *env) {
	viper.AddConfigPath(".")

	viper.SetConfigName("app")

	viper.SetConfigType("env")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("Error reading env file", err)
	}

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal(err)
	}
	return
}
