import * as React from 'react';
import renderer from 'react-test-renderer';
import { PartsOfMachine } from '../PartsOfMachine'

describe('PartsOfMachine', () => {
    it('render both the machine name and score', () => {
        const props = {
            'machineName': 'Welding Robot',
            'parts': {
                'vibrationLevel': 'Vibration Level',
                'electrodeWear': 'Electrode Wear'
            }
        };
        const tree = renderer.create(<PartsOfMachine{...props}/>);
        const partsOfMachine = tree.root;

        expect(partsOfMachine.findAllByType('Text').length).toEqual(3);
        expect(partsOfMachine.findAllByType('Text')[0].children).toEqual(['Welding Robot']);
        expect(partsOfMachine.findAllByType('Text')[1].children).toEqual(['vibrationLevel', ': ', 'Vibration Level']);
        expect(partsOfMachine.findAllByType('Text')[2].children).toEqual(['electrodeWear', ': ', 'Electrode Wear']);
    });

    it('not render anything when no parts', () => {
        const props = {'machineName': 'weldingRobot', 'parts': undefined};
        const tree = renderer.create(<PartsOfMachine{...props}/>);
        const partsOfMachine = tree.root;

        expect(partsOfMachine.children).toEqual([]);
    });
});