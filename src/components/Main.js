import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
        <div id="content">
            <h1>土地の貸し借り</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                const name1 = this.productName1.value
                const name2 = this.productName2.value
                const name3 = this.productName3.value
                const addr = this.productAddress.value
                const space = this.productSpace.value
                const whet = this.productWhet.value
                const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                this.props.createProduct(name1, name2, name3, addr, space, whet, price)
                }}>
                <p>&nbsp;</p>
                <h4>
                    都道府県
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                    id="productName1"
                    type="text"
                    ref={(input) => { this.productName1 = input }}
                    className="form-control"
                    placeholder="例：東京都"
                    required />
                </div>
                <h4>
                    市区町村
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                    id="productName2"
                    type="text"
                    ref={(input) => { this.productName2 = input }}
                    className="form-control"
                    placeholder="例：新宿区"
                    required />
                </div>
                <h4>
                    町字
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                     id="productName3"
                     type="text"
                     ref={(input) => { this.productName3 = input }}
                     className="form-control"
                     placeholder="例：高田馬場"
                     required />
                </div>
                <h4>
                    丁目・番地・号
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                     id="productAddress"
                     type="text"
                     ref={(input) => { this.productAddress = input }}
                     className="form-control"
                     placeholder="例：2-11-10"
                     required />
                </div>
                <h4>
                    面積（㎡）
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                     id="productSpace"
                     type="text"
                     ref={(input) => { this.productSpace = input }}
                     className="form-control"
                     placeholder="例：10"
                     required />
                </div>
                <h4>
                    期間
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                    id="productWhet"
                    type="text"
                    ref={(input) => { this.productWhet = input }}
                    className="form-control"
                    placeholder="例：XXXX年XX月XX日"
                    required />
                </div>
                <h4>
                    価格
                </h4>
                <div className="form-group mr-sm-2">
                    <input
                     id="productPrice"
                     type="text"
                     ref={(input) => { this.productPrice = input }}
                     className="form-control"
                     placeholder="例：0.1"
                     required />
                </div>
                <button type="submit" className="btn btn-primary">追加</button>
            </form>
            <p>&nbsp;</p>
            <h2>貸し出しされてる土地</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">都道府県</th>
                        <th scope="col">市区町村</th>
                        <th scope="col">町字</th>
                        <th scope="col">丁目・番地・号</th>
                        <th scope="col">面積（㎡）</th>
                        <th scope="col">期間</th>
                        <th scope="col">価格</th>
                        <th scope="col">持ち主</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="productList">
                    { this.props.products.map((product, key) => {
                        return(
                        <tr key={key}>
                            <th scope="row">{product.id.toString()}</th>
                            <td>{product.name1}</td>
                            <td>{product.name2}</td>
                            <td>{product.name3}</td>
                            <td>{product.addr}</td>
                            <td>{product.space.toString()}</td>
                            <td>{product.whet}</td>
                            <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                            <td>{product.owner}</td>
                            <td>
                                { !product.purchased
                                ? <button
                                name={product.id}
                                value={product.price}
                                onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                }}
                                >
                                    契約をする
                                    </button>
                                    : null
                                }
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        );
    }
}

export default Main;
