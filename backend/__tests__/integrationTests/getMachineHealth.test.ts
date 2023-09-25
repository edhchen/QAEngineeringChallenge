import axios, {AxiosError} from 'axios';
import { response } from 'express';

    describe('API Integration Tests', () => {

       // Define the API endpoint URL
      const apiUrl = 'http://localhost:3001/machine-health';

        it('Successfully make a POST request to the API machineHealth', async () => {
             
          // Define the request payload
          const requestData = {
            "machines": {
                  "weldingRobot": {
                    "errorRate": "0.8",
                    "vibrationLevel": "4.0"
                     },
                  "assemblyLine": {
                    "alignmentAccuracy": '0.5',
                    "speed": '6',
                    },
                }
            };
      
          try {
            // Make the POST request using axios
            const response = await axios.post(apiUrl, requestData);
      
            // Assertions based on the API response
           
            // Check if the status code is as expected
            expect(response.status).toEqual(200); 

            // Check for expected response properties and value
            const expectedFactoryScore = '77.15';
            expect(response.data).toHaveProperty('factory', expectedFactoryScore); 
            
            //Check for expected response properties
            expect(response.data).toHaveProperty('machineScores'); 

            // Check for expected response properties and value
            const expectedWeldingrobotScore = '88.19';
            expect(response.data.machineScores).toHaveProperty('weldingRobot', expectedWeldingrobotScore); 

            // Check for expected response properties and value
            const expectedAssemblyLineScore = '66.11';
            expect(response.data.machineScores).toHaveProperty('assemblyLine', expectedAssemblyLineScore); 

          } catch (error) {
            throw error; // Rethrow the error to fail the test
          }
        });

        it('Invalid format make a POST request', async () => {      
          // Define the request payload with invalid format
          const requestData = {
            "airplane": {
                  "weldingRobot": {
                    "errorRate": "0.8",
                    "vibrationLevel": "4.0"
                     },
                  "assemblyLine": {
                    "alignmentAccuracy": '0.5',
                    "speed": '6',
                    },
                }
            };
      
          try {
            // Make the POST request using axios
            const response = await axios.post(apiUrl, requestData);
      

          } catch (error: unknown) {
        
           if (axios.isAxiosError(error)) {
            // Explicitly cast the error to AxiosError
            const axiosError = error as AxiosError;
        
            if (axiosError.response && axiosError.response.status === 400) {
              // Handle the 400 Bad Request error here
              expect(axiosError.response.data).toHaveProperty('error', 'Invalid input format');
            } else {
              // Handle other Axios errors
              console.error('Axios Error:', axiosError.message);
            }
          } else {
            // Handle other errors that may occur during the request
            console.error('Error:', (error as Error).message);
          }

          }
        });
      });
    


