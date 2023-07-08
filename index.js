// Copyright (c)2023 Quinn Michaels
//Story Deva is responsible is all about #StoryLand.

const fs = require('fs');
const path = require('path');

const package = require('./package.json');
const info = {
  id: package.id,
  name: package.name,
  describe: package.description,
  version: package.version,
  url: package.homepage,
  dir: __dirname,
  git: package.repository.url,
  bugs: package.bugs.url,
  author: package.author,
  license: package.license,
  copyright: package.copyright,
};

const data_path = path.join(__dirname, 'data.json');
const {agent,vars} = require(data_path).DATA;

const Deva = require('@indra.ai/deva');
const ASSISTANT = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {
      return input.trim();
    },
    parse(input) {
      return input.trim();
    },
    process(input) {
      return input.trim();
    },
  },
  listeners: {},
  modules: {},
  deva: {},
  func: {
    ass_question(packet) {return},
    ass_answer(packet) {
      const agent = this.agent();
      const assistant = this.assistant();
      assistant.personal.answers.push(packet);
    },
  },
  methods: {},
  onDone(data) {
    this.listen('devacore:question', packet => {
      if (packet.q.text.includes(this.vars.trigger)) return this.func.ass_question(packet);
    });
    this.listen('devacore:answer', packet => {
      if (packet.a.text.includes(this.vars.trigger)) return this.func.ass_answer(packet);
    });
    return Promise.resolve(data);
  },
});
module.exports = ASSISTANT
