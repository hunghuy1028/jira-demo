"use client"

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LS } from "../Helper";
import { AuthData } from "./AuthData";
import { Constants } from "../Constants";

export default function Auth() {

    const params = useSearchParams();
    const [count, setCount] = useState(0);


    useEffect(() => {

        if(count > 0) {
            return;
        }

        const state = params.get('state');
        const code = params.get('code');
        setCount(1);

        if(code){
            // Exchange for access token
            getAccessToken(code)
                .then(req => {
                    const accessToken = req?.data?.access_token;
                    console.log(accessToken);

                    
                    if(accessToken){
                        getCloudId(accessToken)
                        .then(data => {
                            // assume that only one cloudId
                            const cloudId = data[0]?.id;

                            // store to local storage
                            let authData: AuthData = {
                                state: state,
                                accessToken: accessToken,
                                code: code,
                                cloudId: cloudId,
                                domain: data[0]?.url
                            }
                            LS.set("login", authData);

                            window.close();
                        })

                        
                    }
                });
        }
        
    }, []);

    const getAccessToken = async (code: string) => {
        try {
            const req = await axios({
                url: "https://auth.atlassian.com/oauth/token",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "grant_type": "authorization_code",
                    "client_id": Constants.ClientId,
                    "client_secret": Constants.ClientSecret,
                    "code": code,
                    "redirect_uri": "http://localhost:3200/auth"
                }
            });
            console.log(req);

            return req;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    const getCloudId = async (accessToken: string) => {
        try {
            const req = await axios({
                url: "https://api.atlassian.com/oauth/token/accessible-resources",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            return req?.data;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    return (
      <p>Authenticating....</p>
    );
  }
  