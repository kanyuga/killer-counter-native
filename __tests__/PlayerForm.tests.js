import React from 'react';
import PlayerForm from '../js/components/Player/PlayerForm';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe("snapshots", () => {
  it ("doesn't show the start button when not started or startable", () => {
    expect(renderer.create(
      <PlayerForm handleChange={() => {}} onSubmit={() => {}} startGame={() => {}} started={false} startable={false} name=""/>
    )).toMatchSnapshot();
  });
  it ("doesn't show the start button when started", () => {
    expect(renderer.create(
      <PlayerForm handleChange={() => {}} onSubmit={() => {}} startGame={() => {}} started={true} startable={false} name=""/>
    )).toMatchSnapshot();
  });
  it ("shows the start button when startable but not started", () => {
    expect(renderer.create(
      <PlayerForm handleChange={() => {}} onSubmit={() => {}} startGame={() => {}} started={false} startable={true} name=""/>
    )).toMatchSnapshot();
  });
});

describe("rendering", () => {
  let name = '';
  const onSubmit = (n) => name = n;
  it ("doesn't show the start button when not started or startable", () => {
    let playerForm = shallow(
      <PlayerForm handleChange={handleChange} onSubmit startGame={} started={true} startable={true} name="afafda"/>
    )
  });
});