class User {
    constructor(name, phoneNum) {
        this.name = name;
        this.phoneNum = phoneNum;
    }

    getName() {
        return this.name;
    }

    getPhoneNum() {
        return this.phoneNum;
    }

    updateName(newName) {
        this.name = newName;
    }

    updatePhoneNum(newPhoneNum) {
        this.phoneNum = newPhoneNum;
    }
}

function UserUnitTest(debugInfo) {
    let TestUser = new User("Robert", "9-999-999-9999");

    if (debugInfo) {
        console.log("", TestUser);
    }

    if (typeof (TestUser) == "undefined") {
        console.log("User Unit Test 1 (Constructor) Failed...");
        return false;
    }

    if (TestUser.getName() != "Robert" || TestObject.getPhoneNum() != "9-999-999-9999") {
        console.log("User Unit Test 2 (Accessors) Failed...");
        return false;
    }

    TestObject.updateName("Ben");
    TestObject.updatePhoneNum("1-111-111-1111");

    if (TestObject.getName() != "Ben" || TestObject.getPhoneNum()!= "1-111-111-1111") {
        console.log("User Unit Test 3 (Mutators) Failed...");
        return false;
    }

    else {
        console.log("All User Unit Tests Passed Successfully!");
        return true;
    }

}

export {User, UserUnitTest};