const TYPE_SPEED = 26; // chars per second

export class DialogueSystem {
  constructor(root, state) {
    this.root = root;
    this.speakerEl = root.querySelector('#dlg-speaker');
    this.textEl = root.querySelector('#dlg-text');
    this.choicesEl = root.querySelector('#dlg-choices');
    this.continueEl = root.querySelector('#dlg-continue');
    this.state = state; // shared flags object
    this.active = false;
    this.nodes = {};
    this.current = null;
    this._typing = false;
    this._fullText = '';
    this._typeT = 0;
    this._lastTypedLen = 0;
    this.onEnd = null;
    this.onNodeEnter = null;
    this.onType = null;    // fired as characters appear (throttled by caller)
    this.onChoice = null;  // fired when a choice is picked

    this.root.addEventListener('click', () => this._advanceClick());
  }

  loadGraph(nodes) { this.nodes = nodes; }

  start(nodeId) {
    this.active = true;
    this.root.classList.remove('hidden');
    this._goTo(nodeId);
  }

  end() {
    this.active = false;
    this.root.classList.add('hidden');
    this.current = null;
    if (this.onEnd) this.onEnd();
  }

  _goTo(nodeId) {
    const node = this.nodes[nodeId];
    if (!node) { this.end(); return; }
    this.current = node;
    if (node.effect) node.effect(this.state);
    if (this.onNodeEnter) this.onNodeEnter(node, nodeId);

    if (node.end) { this._finishAfterText = () => this.end(); }
    else this._finishAfterText = null;

    this.speakerEl.textContent = node.speaker || '';
    this.choicesEl.innerHTML = '';
    this.continueEl.classList.add('hidden');
    this._fullText = typeof node.text === 'function' ? node.text(this.state) : (node.text || '');
    this._typeT = 0;
    this._lastTypedLen = 0;
    this._typing = true;
    this.textEl.innerHTML = '<span class="cursor">▍</span>';
  }

  update(dt) {
    if (!this.active || !this.current || !this._typing) return;
    this._typeT += dt * TYPE_SPEED;
    const n = Math.min(this._fullText.length, Math.floor(this._typeT));
    if (n > this._lastTypedLen && this.onType && n % 2 === 0) this.onType();
    this._lastTypedLen = n;
    this.textEl.innerHTML = escapeHtml(this._fullText.slice(0, n)) + '<span class="cursor">▍</span>';
    if (n >= this._fullText.length) {
      this._typing = false;
      this.textEl.innerHTML = escapeHtml(this._fullText);
      this._showOptions();
    }
  }

  skipTyping() {
    if (this._typing) {
      this._typing = false;
      this.textEl.innerHTML = escapeHtml(this._fullText);
      this._showOptions();
      return true;
    }
    return false;
  }

  _showOptions() {
    const node = this.current;
    const choices = (node.choices || []).filter(c => !c.when || c.when(this.state));
    if (choices.length) {
      choices.forEach((c, i) => {
        const btn = document.createElement('div');
        btn.className = 'dlg-choice';
        btn.innerHTML = `<span class="num">${i + 1}</span><span>${c.label}</span>`;
        btn.addEventListener('click', (ev) => { ev.stopPropagation(); this._choose(c); });
        this.choicesEl.appendChild(btn);
      });
    } else if (node.next) {
      this.continueEl.classList.remove('hidden');
    } else {
      this.continueEl.classList.remove('hidden');
    }
  }

  _choose(choice) {
    if (this.onChoice) this.onChoice();
    if (choice.effect) choice.effect(this.state);
    if (choice.next) this._goTo(choice.next);
    else this.end();
  }

  _advanceClick() {
    if (!this.active || !this.current) return;
    if (this.skipTyping()) return;
    const node = this.current;
    if (node.choices && node.choices.length) return; // must pick a choice
    if (node.next) this._goTo(node.next);
    else this.end();
  }

  handleNumberKey(n) {
    if (!this.active || !this.current || this._typing) return;
    const choices = (this.current.choices || []).filter(c => !c.when || c.when(this.state));
    const c = choices[n - 1];
    if (c) this._choose(c);
  }

  handleInteractKey() {
    if (!this.active) return;
    this._advanceClick();
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
