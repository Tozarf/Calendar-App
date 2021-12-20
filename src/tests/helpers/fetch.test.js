import { tokenFetch, tokenlessFetch } from "../../helpers/fetch";

describe("Testing fetch helper", () => {
    let token = "";

    test("tokenless fetch should work correctly", async () => {
        const resp = await tokenlessFetch(
            "auth",
            { email: "fausto.zaruma@enroutesystems.com", password: "123456" },
            "POST"
        );
        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);
        token = body.token;
    });
    test("tokenfetch should work correctly", async () => {
        localStorage.setItem("token", token);

        const resp = await tokenFetch(
            "events/61ba5568c393a836e6ad992b",
            {},
            "DELETE"
        );
        const body = await resp.json();

        expect(body.msg).toBe("There are no matching events with that id");
    });
});
