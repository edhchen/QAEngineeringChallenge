import * as React from 'react';
import renderer from 'react-test-renderer';
import { MachineScore } from '../MachineScore'

describe('MachineScore', () => {
    it('render both the machine name and score', () => {
        const props = {'machineName': 'weldingRobot', 'score': '50'};
        const tree = renderer.create(<MachineScore{...props}/>);
        const machineScore = tree.root;

        expect(machineScore.findByType('Text').children).toEqual(['Welding Robot: 50']);
    });

    it('not render anything when no score', () => {
        const props = {'machineName': 'weldingRobot', 'score': undefined};
        const tree = renderer.create(<MachineScore{...props}/>);
        const machineScore = tree.root;

        expect(machineScore.children).toEqual([]);
    });
    
    it('render invalid machine name and score', () => {
        const props = {'machineName': 'invalid', 'score': '50'};
        const tree = renderer.create(<MachineScore{...props}/>);
        const machineScore = tree.root;

        expect(machineScore.findByType('Text').children).toEqual(['undefined: 50']);
    });
});