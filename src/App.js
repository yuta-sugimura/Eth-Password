import React, { Component } from 'react'
import contractDefinition from '../build/contracts/PasswordEscrow.json'
import getWeb3 from './utils/getWeb3'
import getAccounts from './utils/getAccounts'
import getContractInstance from './utils/getContractInstance'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null, accounts: null, contract: null, balance: 0,
      deposit: null, depositPassword: '', depositValue: '',
      getTransfer: null, getTransferPassword: '',
      advancedDeposit: null, depositNumber: '', getTransferNumber: '',
      getAdvancedTransfer: null,
      checkbox: 'advanced', checked: '', classLeft: 'on-click', classRight: 'off',
      emergency: null, open: 'close', viewPassword: [], length: 0
    }

      this.depositPassword = this.depositPassword.bind(this)
      this.depositValue = this.depositValue.bind(this)
      this.depositNumber = this.depositNumber.bind(this)
      this.getTransferPassword = this.getTransferPassword.bind(this)
      this.getTransferNumber = this.getTransferNumber.bind(this)

      this.rightClick = this.rightClick.bind(this)
      this.leftClick = this.leftClick.bind(this)
      this.checkbox = this.checkbox.bind(this)
  }

  componentWillMount = async () =>  {
    try {
      let web3 = await getWeb3()
      let contract = await getContractInstance(web3, contractDefinition)
      let accounts = await getAccounts(web3)

      this.setState({web3, contract, accounts}, this.viewPassword)


      this.deposit = this.deposit.bind(this)
      this.getTransfer = this.getTransfer.bind(this)
      this.advancedDeposit = this.advancedDeposit.bind(this)
      this.getAdvancedTransfer = this.getAdvancedTransfer.bind(this)

    } catch (error) {
      console.log(error)
    }
  }

  deposit = async () => {
    const { accounts, contract, web3 } = this.state

    let amount = this.state.depositValue
    let ether = web3.toWei(amount, "ether").toString()

    const deposit = await contract.deposit(this.state.depositPassword, {from: accounts[0], value: ether})

    this.setState({deposit})

    alert(`合言葉でETHを保存したよ`)
  }

  getTransfer = async() => {
    const { accounts, contract } = this.state
    const getTransfer = await contract.getTransfer(this.state.getTransferPassword, {from: accounts[0]})

    this.setState({getTransfer: getTransfer})

    alert('ETHを受け取ったよ')
  }

  advancedDeposit = async() => {
    const {accounts, contract, web3 } = this.state

    let amount = this.state.depositValue
    let ether = web3.toWei(amount, 'ether').toString()

    const advancedDeposit = await contract.AdvancedDeposit(this.state.depositPassword, this.state.depositNumber, {from: accounts[0], value: ether})

    this.setState({advancedDeposit})

    alert('高度な合言葉でETHを保存したよ')
  }

  getAdvancedTransfer = async() => {
    const {accounts, contract } = this.state

    const getAdvancedTransfer = await contract.getAdvancedTransfer(this.state.getTransferPassword, this.state.getTransferNumber, {from: accounts[0]})

    this.setState({getAdvancedTransfer})

    alert(`ETHを受け取ったよ`)
  }
/*
  viewPassword = async () => {
    const {accounts, contract} = this.state

    let indexNumber = await contract.viewIndexNumber({from: accounts[0]})
    this.setState({length: indexNumber[2]})

    const viewPassword = []

    for(let i = 0; i < this.state.length; i++) {
      let viewPass = await contract.viewPassword(i, {from: accounts[0]})

      viewPassword.push(
        <li>
          {viewPass[0]}
        </li>
      )
      this.setState({viewPassword: viewPassword})
    }

    if(this.state.open === 'close') {
      this.setState({open: 'open'})
    }else {
      this.setState({open: 'false'})
    }

  }
*/

  depositPassword(event) {
    this.setState({depositPassword: event.target.value})
  }

  depositValue(event) {
    this.setState({depositValue: event.target.value})
  }

  depositNumber(event) {
    this.setState({depositNumber: event.target.value})
  }

  getTransferPassword(event) {
    this.setState({getTransferPassword: event.target.value})
  }

  getTransferNumber(event) {
    this.setState({getTransferNumber: event.target.value})
  }

  checkbox(event) {
    if(this.state.checkbox === 'on') {
      this.setState({checkbox: 'advanced', checked: ''})
    }else {
      this.setState({checkbox: event.target.value, checked: 'checked'})
    }
  }

  rightClick = () => {
    if(this.state.classRight === 'off') {
      this.setState({classRight: 'on-click', classLeft: 'off', checkbox: 'advanced'})
    }
  }

  leftClick = () => {
    if(this.state.classLeft === 'off') {
      this.setState({classLeft: 'on-click', classRight: 'off', checkbox: 'advanced'})
    }
  }


  render() {

    return (
      <div className="App">

        <main className="container">
          <div className="row"></div>
          <div className="row accounts center-align">
            <p>accounts: <span>{this.state.accounts}</span></p>
          </div>
          <section className="password-box row">

            <div className="password-main col m8 s12 offset-m2 z-depth-2 center-align">

              <div className="select-deposit password-select row">
                <div className={`${this.state.classLeft} col m6 s6`} onClick={this.leftClick}>送金</div>
                <div className={`${this.state.classRight} col m6 s6`} onClick={this.rightClick}>受け取り</div>
              </div>

              <section className={`${this.state.classLeft} deposit`}>

                <div className="row title">
                  <h2>送金</h2>
                </div>

                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <input placeholder="例) こんにちは" id="first_name" type="text" value={this.state.depositPassword} onChange={this.depositPassword} className="validate" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <input placeholder="1 = 1 ether" id="first_name" type="number" step="0.000000001" max="100" min="0.000000001" value={this.state.depositValue} onChange={this.depositValue} className="validate" />
                  </div>
                </div>

                <div className={`${this.state.checkbox} row`}>
                  <div className="input-field col s10 offset-s1">
                    <input placeholder="0~999999の自然数" id="first_name" type="number" min="0" max="999999"  value={this.state.depositNumber} onChange={this.depositNumber} className="validate" />
                  </div>
                </div>


                <div className="row">
                  <div className={`switch col m12 s12`}>
                    <label>
                      安全に送金
                      <input type="checkbox" value="on" onChange={this.checkbox} checked={this.state.checked} />
                      <span className="lever"></span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 word">
                    <p>合言葉を忘れないでね</p>
                  </div>
                </div>

                <div className="password-button row">
                  <button className={`${this.state.checkbox} before password-button waves-effect waves-light btn-large`} onClick={this.deposit}>合言葉で送金</button>
                  <button className={`${this.state.checkbox} password-button waves-effect waves-light btn-large`} onClick={this.advancedDeposit}>安全に送金</button>
                </div>

              </section>

              <section className={`${this.state.classRight} getTransfer`}>

                <div className="row">
                  <h2>受け取り</h2>
                </div>

                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <input placeholder="例) こんにちは" id="first_name" type="text" value={this.state.getTransferPassword} onChange={this.getTransferPassword} className="validate" />
                  </div>
                </div>

                <div className={`${this.state.checkbox} row`}>
                  <div className="input-field col s10 offset-s1">
                    <input placeholder="0~999999の自然数" id="first_name" type="number" min="0" max="999999" value={this.state.getTransferNumber} onChange={this.getTransferNumber} className="validate" />
                  </div>
                </div>

                <div className="row">
                  <div className="switch col m12 s12">
                    <label>
                      安全に受け取り
                      <input type="checkbox" value="on" onChange={this.checkbox} checked={this.state.checked} />
                      <span className="lever"></span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 word">
                    <p>合言葉を教えてもらおう</p>
                  </div>
                </div>

                <div className="password-button row">
                  <button className={`${this.state.checkbox} before password-button waves-effect waves-light btn-large`} onClick={this.getTransfer}>受け取り</button>
                  <button className={`${this.state.checkbox} password-button waves-effect waves-light btn-large`} onClick={this.getAdvancedTransfer}>受け取り</button>
                </div>

              </section>

            </div>
          </section>

          <section className={`emergency row`}>

            <div className="row center-align">
              <p>合言葉を忘れてしまった場合はこちら</p>
              <button className={`waves -effect waves-light btn`}  onClick={this.viewPassword}>合言葉検索</button>
            </div>
            <div className={`${this.state.open} row`}>
              <ul>
                {this.state.viewPassword}
              </ul>
              <input />
              <button></button>
            </div>
          </section>

        </main>
      </div>
    )
  }
}

export default App
