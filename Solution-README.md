# Approach:
- For the unit testing approach, we concentrate on the isolation of individual backend and native-app components or functions. Each unit is independently tested to ensure that it functions precisely as per its specifications. This entails verifying various components, including the following:
  -
  - Confirming that all enums related to machineType and machinePart perform as expected within the components calculations.ts and machineHealth.ts.
  - Validating the accuracy of machine parts' health score calculations when provided with input values and ensuring that they correctly classify machine status as normal, abnormal, or optimal. This involves scrutinizing the component calculations.ts -> calculatePartHealth.
  - Ensuring that machine health part average score calculations align with expectations. This entails examining the component calculations.ts -> calculateMachineHealth.
  - Verifying that machine health scores are returned as anticipated when simulating a request input. This validation includes examining the component machineHealth.ts -> getMachineHealth.
  - Confirming that the functions are capable of handling unexpected data scenarios, such as unknown machine names and part types, as well as invalid formats.
  - Design a test suites for easy updates, ensuring that scripts can seamlessly execute with various data inputs.


- In integration testing, our primary focus lies in testing the functionality of the backend server endpoints to ensure that they can successfully process service requests and provide appropriate responses. Testing approach includes the following key verifications:
  -  
  - Confirming that the server endpoint can effectively execute a POST request with the correct format and respond with the expected machine health score.
  - Ensuring that the server endpoint is capable of handling unexpected request formats gracefully and without errors.


## Including:
- backend: Unit tests and integration test for calculations.ts and machineHealth.ts
- native-app: Unit tests for components: MachineScore.tsx, PartsOfMachine.tsx, and Picker.tsx

### Test location:
```
 ├── backend/
 │   ├── __tests__
 │      ├── unitTests
 │      │   ├── calculations.test.ts
 │      │   ├── machinesHealth.test.ts 
 │      ├── integartionTests
 │          ├──integration.test.ts
 
 ├── native-app/
 │   ├── components
 │      ├── __tests__
 │          ├── MachineScore.test.js
 │          ├── PartsOfMachine.test.js 
 │          ├── Picker.test.js
```

## Instruction to run the test

### Installation
```bash
yarn
```

### Running the test

To run the all the backend or native-app unit tests, navigate to respected test folder, and use the following command:
```bash
yarn test
```

To run the individual unit test, use the following command:

```bash
yarn test calculations.test.ts
```
Repeat for with another test ex: machinesHealth.test.ts

### Running the coverage report
To run the all the backend or native-app unit tests coverage, navigate to respected test folder, and use the following command:
```bash
yarn coverage 
```

### Running the backend integration
To run integration test under the integrationTests folder, use the following command:
```bash
yarn test getMachineHealth.test.ts
```

## Regression strategy

- Tests can be executed individually based on the code change in the future release
- Tests easily updated if enum and machinesData got changed, just need to update the data in the each test suite. 




