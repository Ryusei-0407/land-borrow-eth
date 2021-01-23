import React, { Component } from 'react';
import Web3 from 'web3'
import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('metamaskが有効になっていません。')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Marketplace.networks[networkId]
        if(networkData) {
            const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
            this.setState({ marketplace })
            const productCount = await marketplace.methods.productCount().call()
            this.setState({ productCount })
            for (var i = 1; i <= productCount; i++) {
              const product = await marketplace.methods.products(i).call()
              this.setState({
                products: [...this.state.products, product]
              })
            }
            this.setState({ loading: false})
        } else {
            window.alert('ネットワークにデプロイされていません。')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true
        }

        this.createProduct = this.createProduct.bind(this)
        this.purchaseProduct = this.purchaseProduct.bind(this)
    }

    createProduct(name1, name2, name3, addr, space, whet, price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.createProduct(name1, name2, name3, addr, space, whet, price).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
    }

    purchaseProduct(id, price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex">
                            { this.state.loading
                              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                              : <Main
                                products={this.state.products}
                                createProduct={this.createProduct}
                                purchaseProduct={this.purchaseProduct} />
                            }
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App
