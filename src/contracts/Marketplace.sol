pragma solidity >=0.5.0 <0.6.0;

contract Marketplace {
    string public name1;
    string public name2;
    string public name3;
    string public addr;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name1;
        string name2;
        string name3;
        string addr;
        uint space;
        string whet;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name1,
        string name2,
        string name3,
        string addr,
        uint space,
        string whet,
        uint price,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name1,
        string name2,
        string name3,
        string addr,
        uint space,
        string whet,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name1 = "Name1";
        name2 = "Name2";
        name3 = "Name3";
        addr = "Address";
    }

    function createProduct(string memory _name1, string memory _name2, string memory _name3, string memory _addr, uint _space, string memory _whet, uint _price) public {
        require(bytes(_name1).length > 0);
        require(bytes(_name2).length > 0);
        require(bytes(_name3).length > 0);
        require(bytes(_addr).length > 0);
        require(bytes(_whet).length > 0);
        require(_space > 0);
        require(_price > 0);
        productCount++;
        products[productCount] = Product(productCount, _name1, _name2, _name3, _addr, _space, _whet, _price, msg.sender, false);
        emit ProductCreated(productCount, _name1, _name2, _name3, _addr, _space, _whet, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
        require(_product.id > 0 && _product.id <= productCount);
        require(msg.value >= _product.price);
        require(!_product.purchased);
        require(_seller != msg.sender);
        _product.owner = msg.sender;
        _product.purchased = true;
        products[_id] = _product;
        _seller.transfer(msg.value);
        emit ProductPurchased(productCount, _product.name1, _product.name2, _product.name3, _product.addr, _product.space, _product.whet, _product.price, msg.sender, true);
    }
}