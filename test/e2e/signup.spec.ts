import {test,expect} from "@playwright/test"
import { SignupPage } from "../pages/SignupPage"
import { home_url, validEmail, validPassword } from "../helper-config"


test.beforeEach(async({page})=>{
    await page.goto(home_url)
})

test('signup',async({page})=>{
    const signup=new SignupPage({page})

    await signup.signup(validEmail,'Luffy',validPassword)

})