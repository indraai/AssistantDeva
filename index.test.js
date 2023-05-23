// Copyright (c):year: :copyright:
// :name: test file

const {expect} = require('chai')
const AssistantDeva = require('./index.js');

describe(AssistantDeva.me.name, () => {
  beforeEach(() => {
    return AssistantDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(AssistantDeva).to.be.an('object');
    expect(AssistantDeva).to.have.property('agent');
    expect(AssistantDeva).to.have.property('vars');
    expect(AssistantDeva).to.have.property('listeners');
    expect(AssistantDeva).to.have.property('methods');
    expect(AssistantDeva).to.have.property('modules');
  });
})
