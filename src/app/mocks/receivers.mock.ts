export const ReceiversDetails = {
    receiversDetails: {
        status: 200,
        message: {
            code: "200",
            description: "Success"
        },
        errors: null,
        beneficiaries: [
            {
                firstName: "Test",
                lastName: "Test",
                country: "India",
                bankAccountNumber: 1234567,
                iban: "IDFC004",
                nickName: "test123",
                mobileNumber: "8989898989"
            }
        ]
    },
    getReceiverDetails: {
        status: 200,
        message: {
            code: "200",
            description: "Success"
        },
        errors: null,
        beneficiary: {
            firstName: "Test",
            lastName: "Test",
            country: "India",
            mobileNumber: "1234567890",
            bankAccountNumber: 1234567,
            iban: "IDFC004",
            nickName: "test123"
        }
    },
    addReceiverDetails: {
        status: 200,
        message: {
            code: "200",
            description: "User Beneficiary Added Successfully"
        },
        errors: null,
        beneficiary: {
            firstName: "Test",
            lastName: "Test",
            country: "India",
            bankAccountNumber: 1234567,
            iban: "IDFC004",
            nickName: "test"
        }
    },
    modifyReceiverDetails: {
        status: 200,
        message: {
            code: "200",
            description: "Receiver modified successfully"
        },
        errors: null,
        beneficiary: {
            firstName: "Altimetrik",
            lastName: "Pune",
            country: "India",
            bankAccountNumber: 1234567,
            iban: "IDFC004",
            nickName: "test123"
        }
    },
    deleteReceiver: {
        status: 200,
        message: {
            code: "200",
            description: "Success"
        },
        errors: null,
        beneficiaries: []
    },
}