//
// Setup the AppSweep Gradle plugin in the app
// Gradle> 7.0

plugins {
    id "com.guardsquire.appsweep" version "7.0"
    // Add other plugins here
}

// Test the key localy with
APPSWEEP_API_KEY=gs_appsweep_{GENERATED_API_KEY} ./gradlew uploadToAppSweepDebug

// Implement the AppSweep API Key for the project
stages {
    stage('Upload To AppSweep') {
        steps {
            dir(PROJECT_DIR) {
                withCredentials([string(credentialsId: 'appsweep-api-key', 
                                        variable: 'appsweep_key')]) {
                    withEnv(["APPSWEEP_API_KEY=$appsweep_key"]){
                        sh(script: "./gradlew uploadToAppSweepDebug", returnStdout: true)
                    }
                }
            }
        }
    }
 }