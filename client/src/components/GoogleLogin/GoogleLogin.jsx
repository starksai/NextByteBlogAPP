import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider } from "@/Helpers/firebase";
import { getEnv } from "@/Helpers/getEnv";
import { useNavigate } from "react-router-dom";
import { showToastify } from "@/Helpers/showToastify";
import { RouteIndex } from "@/Helpers/Routename";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "@/Redux/slices/user.slice";


export const GoogleLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleGoogleLogin = async () => {
        const GoogleResponse = await signInWithPopup(auth, GoogleProvider);
        // console.log(res);


        const user = GoogleResponse.user
        const DataBody = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL
        }
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/Google-login`, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(DataBody)
            })

            const data = await response.json()
            // console.log(data);


            if (!response.ok) {

                return showToastify("error", data.message)


            }
            dispatch(setUser(data.user))


            navigate(RouteIndex)
            showToastify("success", data.message)

        } catch (error) {
            showToastify("error", error.message)
        }
    }

    return (
        <div>
            <Button onClick={handleGoogleLogin} className="w-full" variant="outline" >
                <FcGoogle />
                Continue with Google
            </Button>
        </div>


    )
}



