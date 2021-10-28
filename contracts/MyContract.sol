pragma solidity >=0.8.0;

contract MyContract{
    address public admin;
    struct Child{
        uint amount;
        uint timeToGetMoney;
        bool paid;
    }
    mapping(address=>Child) public Childs;

    constructor(){
        admin=msg.sender;
    }

    function addChild(address _child, uint _time) payable external{
        require(msg.sender==admin,"Only Admin Can Add Child");
        require(Childs[_child].amount==0, "This Child Already Exist");
        Childs[_child]=Child(msg.value,block.timestamp+_time,false);
    }

    function withdraw() external {
        require(Childs[msg.sender].amount>0,"Only Child Can Witdraw");
        require(Childs[msg.sender].timeToGetMoney<=block.timestamp,"Too Early To Withdraw");
        require(Childs[msg.sender].paid==true,"Already Withdrawed");
        Childs[msg.sender].paid=true;
        payable(msg.sender).transfer(Childs[msg.sender].amount);
    }
}