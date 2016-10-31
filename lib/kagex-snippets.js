'use babel';

import KagexSnippetsView from './kagex-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  kagexSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.kagexSnippetsView = new KagexSnippetsView(state.kagexSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kagexSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kagex-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.kagexSnippetsView.destroy();
  },

  serialize() {
    return {
      kagexSnippetsViewState: this.kagexSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('KagexSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
