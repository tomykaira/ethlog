pragma solidity ^0.5.0;


contract EthLog {
   mapping (address => bytes32) nickname;
   event Speech(address indexed _from, string body);
  
   function introduce(bytes32 name) public {
      nickname[msg.sender] = name;
   }
  
   function getNickname(address addr) view public returns (bytes32 nick) {
      return nickname[addr];
   }
  
   function say(string memory x) public {
      emit Speech(msg.sender, x);
   }
}
