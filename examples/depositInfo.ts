import SkinsMoney, {ValidationException} from "../src";

(async () => {
    try {
        const skinsmoney = new SkinsMoney();
        const deposit = skinsmoney.service("SERVICE_ID", "SERVICE_HASH");
        const createDeposit = deposit.createDeposit();
        const payment = await createDeposit.setMinValue(12.34)
            .setCustom("Custom")
            .setRedirectUrl("https://google.com")
            .setTradeUrl("https://steamcommunity.com/...")
            .setSteamId("STEAMID64")
            .make();

        const depositId = payment.getTransactionId() as string;
        const depositInfo = await deposit.getDepositInfo(depositId);
        console.log(depositInfo);
    } catch (error: any) {
        if (error instanceof ValidationException) {
            console.log('ValidationException', error.getErrors());
        }
    }
})();