package configs

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

var Env *env

func InitEnvConfigs() {
	Env = loadEnvVariables()
	fmt.Printf("I read %s\n\n", Env.Mongodb_URI)
}

type env struct {
	Mongodb_URI      string `mapstructure:"MONGODB_URI"`
	Mongodb_Hostname string `mapstructure:"MONGODB_HOSTNAME"`
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
