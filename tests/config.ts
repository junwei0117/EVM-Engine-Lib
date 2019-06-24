export const APIHost = 'node9.puyuma.org';
export const APIPort = 8080;

export const genesisAddress = '0X3F9D41ECEA757FC4E2B44BE3B38A788DE2F11AD7';
export const accountA = {
    address: '0x41de06d0ebe6430492a5c71b5301259c56b8fd30',
    keystore: {
        version: 3,
        id: 'cec84268-7192-413f-a795-90bbc6450a88',
        address: '41de06d0ebe6430492a5c71b5301259c56b8fd30',
        crypto: {
            ciphertext: 'cfa222147891cb373253bef2158e73f3dca4fff1cc58d20e8f6fb3af0012a289',
            cipherparams: {
                iv: 'f9fcb00fe7dc9a03883a54da41461455',
            },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'dfd83809097714d0f2e47f47f983aae097cd4ff32595c7e4673b83dff6fcbd69',
                n: 8192,
                r: 8,
                p: 1,
            },
            mac: '580dbdd982917eb6e0fdcfb20deb7fd7bee8a8837abdeac2f24c5e040d1020f5',
        },
    },
};
export const accountB = {
    address: '0x7d1e2e8a115ba42cdc7a60f8121e904ac9519bb4',
    keysotre: {
        version: 3,
        id: '67975e47-0ab4-4a36-ab5e-20458ab5de8f',
        address: '7d1e2e8a115ba42cdc7a60f8121e904ac9519bb4',
        crypto: {
            ciphertext: 'bf3bd7762b5fbcccb9d076889fe317e10d0e947d821e311a903557d305146593',
            cipherparams: {
                iv: '494644e74463492681f061850b9c9153',
            },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'a86172e040d4f7747246ccea61c32f33f7ec467c670ea9cef131fbce55913396',
                n: 8192,
                r: 8,
                p: 1,
            },
            mac: 'e3d5f4d819eea824e340d9cf77338cc66de65b7afb27edd650354971e6ad96f1',
        },
    },
};

export const CrowdFunding = `
pragma solidity ^0.4.11;

contract CrowdFunding {
    // Defines a new type with two fields.
    struct Funder {
        address addr;
        uint amount;
    }

    struct Campaign {
        address beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
    }

    Campaign campaign;

    event NewContribution(
        address beneficiary,
        address funder,
        uint amount
    );

    event Settlement(
        bool ok
    );

    function CrowdFunding(uint goal, address receiver) {
        // Creates new struct and saves in storage.
        campaign = Campaign({
            beneficiary: receiver,
            fundingGoal: goal,
            numFunders: 0,
            amount:0});
    }

    function contribute() payable {
        campaign.amount += msg.value;
        NewContribution(campaign.beneficiary, msg.sender, msg.value);
    }

    function checkGoalReached() constant returns (bool reached, address beneficiary, uint goal, uint amount) {
        if (campaign.amount < campaign.fundingGoal)
            return (false, campaign.beneficiary, campaign.fundingGoal , campaign.amount);
        else
            return (true, campaign.beneficiary, campaign.fundingGoal , campaign.amount);
    }

    function settle() {
        if (campaign.amount >= campaign.fundingGoal) {
            uint am = campaign.amount;
            campaign.amount = 0;
            campaign.beneficiary.transfer(am);
            Settlement(true);
        } else {
            Settlement(false);
        }
    }
}
`;
