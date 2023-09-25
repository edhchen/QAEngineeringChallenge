import {calculatePartHealth, calculateMachineHealth} from '../../calculations';
import {getMachineHealth} from '../../machineHealth';
import {Request} from 'express';
import {
  MachineType,
  WeldingRobotPart,
  PaintingStationPart,
  AssemblyLinePart,
  QualityControlStationPart,
  partInfo,
} from '../../../native-app/data/types';

describe('calculatePartHealth', () => {
    //Setup data for machineName, part, partValue, range, and msg respect to the data
    [
        {
            machineNameEntity: MachineType.WeldingRobot,
            partEntity: WeldingRobotPart.ErrorRate,
            partValue: 0.1,
            minScore: 50,
            maxScore: 100,
            partMsg: "normal range lower bound"
        },
        {
            machineNameEntity: MachineType.WeldingRobot,
            partEntity: WeldingRobotPart.ErrorRate,
            partValue: 1.1,
            minScore: 0,
            maxScore: 50,
            partMsg: "abnormal range lower bound"
        },
        {
            machineNameEntity: MachineType.WeldingRobot,
            partEntity: WeldingRobotPart.ErrorRate,
            partValue: 0.0,
            minScore: 100,
            maxScore: 100,
            partMsg: "optimal lower bound"
        },
        {
            machineNameEntity: MachineType.AssemblyLine,
            partEntity: AssemblyLinePart.AlignmentAccuracy,
            partValue: 0.5,
            minScore: 50,
            maxScore: 100,
            partMsg: "normal range"
        },
        {
            machineNameEntity: MachineType.AssemblyLine,
            partEntity: AssemblyLinePart.AlignmentAccuracy,
            partValue: 1.5,
            minScore: 0,
            maxScore: 50,
            partMsg: "abnormal range"
        },
        {
            machineNameEntity: MachineType.AssemblyLine,
            partEntity: AssemblyLinePart.AlignmentAccuracy,
            partValue: 0.05,
            minScore: 100,
            maxScore: 100,
            partMsg: "optimal range"
        },
        {
            machineNameEntity: MachineType.PaintingStation,
            partEntity: PaintingStationPart.ColorConsistency,
            partValue: 90,
            minScore: 50,
            maxScore: 100,
            partMsg: "normal range upper bound"
        },
        {
            machineNameEntity: MachineType.PaintingStation,
            partEntity: PaintingStationPart.ColorConsistency,
            partValue: 99.99,
            minScore: 0,
            maxScore: 50,
            partMsg: "abnormal range upper bound"
        },
        {
            machineNameEntity: MachineType.PaintingStation,
            partEntity: PaintingStationPart.ColorConsistency,
            partValue: 89.99,
            minScore: 100,
            maxScore: 100,
            partMsg: "optimal range upper bound"
        }
    ].forEach(({ machineNameEntity,partEntity,partValue, partMsg, minScore, maxScore })=>{
    it(`${machineNameEntity} with ${partEntity} value: ${partValue} in ${partMsg}`, async() => {
        const machineName: MachineType = machineNameEntity;
        const part: partInfo = {name: partEntity, value: partValue};
       
        const result = calculatePartHealth(machineName, part);

        if (minScore == 100){
            expect(result).toBe(minScore);
        } else{
            expect(result).toBeGreaterThanOrEqual(minScore);
            expect(result).toBeLessThanOrEqual(maxScore);
        }
    });
    });

    it('machine part health return 0 when part value out of range', () => {
        const machineName: MachineType = MachineType.PaintingStation;
        const part: partInfo = {name: PaintingStationPart.FlowRate, value: 41};
        const expectedHealth = 0;

        const result = calculatePartHealth(machineName, part);
        expect(result).toBe(expectedHealth);
    });

    it('return 0 when machineName not found in machineType', () => {
        const machineName: string = 'NoneExistentmachine';
        const part: partInfo = {name: WeldingRobotPart.ErrorRate, value: 2.1};
        const expectedHealth = 0;

        const result = calculatePartHealth((machineName as MachineType) , part);
        expect(result).toBe(expectedHealth);
    });

    it('return -1 when partName not found in machine path', () => {
        const machineName: MachineType = MachineType.WeldingRobot;
        const part = {name: 'NoneExistentPart.error', value: 3.0};
        const expectedHealth = -1;

        const result = calculatePartHealth((machineName as MachineType) , (part as partInfo));
        expect(result).toBe(expectedHealth);
    });

});


describe('calculateMachineHealth', () => {
   //setup data for each machineType and machinePart type
    [
        {
            machineNameEntity: MachineType.WeldingRobot,
            partEntityAndValue: [
                {name: WeldingRobotPart.ErrorRate, value: 0.5},
                {name: WeldingRobotPart.VibrationLevel, value: 4.0},
                {name: WeldingRobotPart.ElectrodeWear, value: 0.8},
                {name: WeldingRobotPart.ShieldingPressure, value: 12.0},
                {name: WeldingRobotPart.WireFeedRate, value: 7.5},
                {name: WeldingRobotPart.ArcStability, value: 92.0},
                {name: WeldingRobotPart.SeamWidth, value: 1.5},
                {name: WeldingRobotPart.CoolingEfficiency, value: 85.0},
              ],
        }, 
        {
            machineNameEntity: MachineType.PaintingStation,
            partEntityAndValue: [
                {name: PaintingStationPart.FlowRate, value: 25},
                {name: PaintingStationPart.Pressure, value: 55},
                {name: PaintingStationPart.ColorConsistency, value: 92},
                {name: PaintingStationPart.NozzleCondition, value: 0.5},
              ],
        },
        {
            machineNameEntity: MachineType.AssemblyLine,
            partEntityAndValue: [
                {name: AssemblyLinePart.AlignmentAccuracy, value: 0.5},
                {name: AssemblyLinePart.Speed, value: 0.04},
                {name: AssemblyLinePart.FittingTolerance, value: 92},
                {name: AssemblyLinePart.BeltSpeed, value: 1.5},
              ],
        },
        {
            machineNameEntity: MachineType.QualityControlStation,
            partEntityAndValue: [
                {name: QualityControlStationPart.CameraCalibration, value: 0.5},
                {name: QualityControlStationPart.LightIntensity, value: 92},
                {name: QualityControlStationPart.SoftwareVersion, value: 1.5},
                {name: QualityControlStationPart.CriteriaSettings, value: 0.5},
              ],
        }                   
    ].forEach(({ machineNameEntity,partEntityAndValue })=>{
    it(`${machineNameEntity} health parts average score in normal range`, () => {
        const machineName: MachineType = machineNameEntity;
        const parts = partEntityAndValue;

        const expectedMinScore = 50;
        const expectedMaxScore = 100;

        const result = calculateMachineHealth(machineName, parts);
        expect(result).toBeGreaterThanOrEqual(expectedMinScore);
        expect(result).toBeLessThanOrEqual(expectedMaxScore);
    });
    });

    it('machine health return 0 with no part', () => {
        const machineName: MachineType = MachineType.WeldingRobot;
        const parts: partInfo[] = [];
        const expectedHealth = 0;

        const result = calculateMachineHealth(machineName, parts);
        expect(result).toBe(expectedHealth);
    });

    it('partScores return sum when one of the part scores is -1', () => {
        const machineName: MachineType = MachineType.WeldingRobot;
        const part = [
            {name: WeldingRobotPart.ErrorRate, value: 0.5},
            {name: WeldingRobotPart.VibrationLevel, value: 4.0},
            {name: 'NoneExistentPart.error', value: 3.0},
            {name: WeldingRobotPart.ElectrodeWear, value: 0.8},
        ];

        const expectedHealth = 82.87037037037037;

        const result = calculateMachineHealth(machineName , (part as partInfo[]));
        expect(result).toBe(expectedHealth);
        });

    it('health score return 0 when machine with no part', () => {
        const machineName: MachineType = MachineType.WeldingRobot;
        const part =[
                {name: 'NoneExistentPart.error', value: 3.0},
            ];
            
        const expectedHealth = 0;
            
        const result = calculateMachineHealth(machineName , (part as partInfo[]));
        expect(result).toBe(expectedHealth);
    });
});
