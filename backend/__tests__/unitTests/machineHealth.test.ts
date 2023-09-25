import {calculatePartHealth, calculateMachineHealth} from '../../calculations';
import {getMachineHealth} from '../../machineHealth';
import {Request} from 'express';
import axios from 'axios';
import {
  MachineType,
  WeldingRobotPart,
  PaintingStationPart,
  AssemblyLinePart,
  QualityControlStationPart,
  partInfo,
} from '../../../native-app/data/types';


describe('getMachineHealth', () => {
    it('calculates machine health score', () => {
        // Create a mock request object
        const mockRequest: Partial<Request> = {
            body: {
                machines: {
                    assemblyLine: {
                        alignmentAccuracy: '0.5',
                        speed: '6',
                    },
                    weldingRobot: {
                        vibrationLevel: '4.0',
                        electrodeWear: '0.8',
                    },
                },
            },
        };

        const result = getMachineHealth(mockRequest as Request);

        const expectedFactoryScore = '77.15';
        expect(result).toHaveProperty('factory', expectedFactoryScore);

        expect(result).toHaveProperty('machineScores');

        const expectedAssemblyLineScore = '66.11';
        expect(result.machineScores).toHaveProperty('assemblyLine', expectedAssemblyLineScore);

        const expectedWeldingRobotScore = '88.19';
        expect(result.machineScores).toHaveProperty('weldingRobot', expectedWeldingRobotScore);

        });

    it('should handle invalid input format', () => {
    // Create a mock request object
        const invalidRequest: Partial<Request> = {
            body: {
                airplane: {
                    assemblyLine: {
                        alignmentAccuracy: '0.5',
                        },
                    weldingRobot: {
                        vibrationLevel: '4.0',
                        electrodeWear: '0.8',
                        },
                    },
                },
            };

        const result = getMachineHealth(invalidRequest as Request);

        expect(result).toHaveProperty('error');
        expect(result.error).toBe('Invalid input format');
        });

    it('No machine send in the request body, factoryScore = 0.00', () => {
        const mockRequest: Partial<Request> = {
            body: {
                machines: {},
                },
        };

        const result = getMachineHealth(mockRequest as Request);

        const expectedFactoryCount = '0.00';
        expect(result.factory).toBe(expectedFactoryCount);

    });
});


