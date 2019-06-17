export const APIHost = 'node9.puyuma.org';
export const APIPort = 8080;

export const genesisAddress = '0X3F9D41ECEA757FC4E2B44BE3B38A788DE2F11AD7';
export const accountA = {
    address: '0x8d46d681eb4707772cacade5af4282c4012cad8f',
    keystore: {
        version: 3,
        id: '4f9029fa-ca3c-4908-be13-3fea1d5d773d',
        address: '8d46d681eb4707772cacade5af4282c4012cad8f',
        crypto: {
            ciphertext: '52571c7b2d0b5390f51d52b791e8078c85170b26dce799e2c33e8be174a282ff',
            cipherparams: {
                iv: 'e3b2632d24289e358286d560d18cb374',
            },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '05fcb291a8f0f82be013319135012033c6492bbe73c1b7a288c8278aba53b25d',
                n: 8192,
                r: 8,
                p: 1,
            },
            mac: '48b55c8123cc520b73a7ac11146b17cecaf1f5748b83d956f3f87a98dee610c7',
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
