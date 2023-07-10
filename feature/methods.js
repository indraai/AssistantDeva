module.exports = {
  /**************
  method: assistant
  params: packet
  describe: The global service feature that installs with every agent
  ***************/
  assistant(packet) {
    this.context('feature');
    const assistant = this.assistant();
    const data = {};
    return new Promise((resolve, reject) => {
      this.question(`#docs raw feature/assistant`).then(doc => {
        data.doc = doc.a.data;
        const info = [
          `## Assistant`,
          `::begin:assistant:${assistant.id}`,
          `client: ${assistant.client_name}`,
          `concerns: ${assistant.concerns.join(', ')}`,
          `::end:assistant:${this.hash(assistant)}`,
        ].join('\n');
        const text = doc.a.text.replace(/::info::/g, info)
        return this.question(`#feecting parse ${text}`)
      }).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: assistant
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      })
    });
  },
};
