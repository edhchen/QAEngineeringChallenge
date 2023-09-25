import * as React from 'react';
import renderer from 'react-test-renderer';
import * as Picker from '../Picker'
import {MachineType} from '../../data/types';

describe('Picker', () => {
    it('render machine picker', () => {
        const props = {
            value: 'test-value',
            onSetValue: jest.fn(),
            items: [
                {label: 'Welding Robot', value: MachineType.WeldingRobot},
                {label: 'PaintingStation', value: MachineType.PaintingStation},
                {label: 'Assembly Line', value: MachineType.AssemblyLine},
                {
                  label: 'Quality Control Station',
                  value: MachineType.QualityControlStation,
                },
            ]
        };

        const picker = Picker.default(props);
        expect(picker.props.items.length).toEqual(4);
        expect(picker.props.value).toEqual('test-value');
        expect(picker.props.onValueChange).toBeDefined();
    });
});