
import axios from "axios";
import { Constants, JiraRequest } from "./Constants";
import { useEffect, useState } from "react";
import sampleData from "./example.json";

const bearer = "eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tQUNDRVNTLWE5Njg0YTZlLTY4MjctNGQ1Yi05MzhjLWJkOTZjYzBiOTk0ZCIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiI5NTI3ZGRlMi0zNTMwLTRmM2MtOGUzMC0wNGVmNDI4ZDA1MGQiLCJzdWIiOiI1ZmIyMmYzN2RkMGM1OTAwNzU4ZDhhZDEiLCJuYmYiOjE3MjU3MDIxNTQsImlzcyI6Imh0dHBzOi8vYXV0aC5hdGxhc3NpYW4uY29tIiwiaWF0IjoxNzI1NzAyMTU0LCJleHAiOjE3MjU3MDU3NTQsImF1ZCI6ImxUMG1NemJpTjA3djcxem1pQjQxNGZtSnZsTkpwTnFOIiwiY2xpZW50X2lkIjoibFQwbU16YmlOMDd2NzF6bWlCNDE0Zm1KdmxOSnBOcU4iLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJBQ0NFU1MiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwic2NvcGUiOiJtYW5hZ2U6amlyYS1wcm9qZWN0IG1hbmFnZTpqaXJhLWNvbmZpZ3VyYXRpb24gbWFuYWdlOmppcmEtZGF0YS1wcm92aWRlciByZWFkOmppcmEtd29yayBtYW5hZ2U6amlyYS13ZWJob29rIHdyaXRlOmppcmEtd29yayByZWFkOmppcmEtdXNlciIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9zeXN0ZW1BY2NvdW50SWQiOiI3MTIwMjA6NWY2OWY5ZmItNjg5MC00NGFjLWIxNTctOGRmOTAwNzRlYTlkIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3Byb2Nlc3NSZWdpb24iOiJ1cy13ZXN0LTIiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZW1haWxEb21haW4iOiJnbWFpbC5jb20iLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vdWp0IjoiMGEzZjBmZDAtNzhhZS00OGFiLWJlYjUtM2VlMzY1ZGNiZmNkIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tLzNsbyI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL29hdXRoQ2xpZW50SWQiOiJsVDBtTXpiaU4wN3Y3MXptaUI0MTRmbUp2bE5KcE5xTiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRFbWFpbCI6IjRlNzYxZWQ4LWU3ZDAtNGRkZS1iZTI1LTJmNDk2ODY3NTRmNEBjb25uZWN0LmF0bGFzc2lhbi5jb20iLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsRG9tYWluIjoiY29ubmVjdC5hdGxhc3NpYW4uY29tIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3Nlc3Npb25faWQiOiI4ODFkOGQzYy0xMjY4LTRmZGYtODkyOC0yZTdjZGFlODZmMWYifQ.sHh-e5LTOBljBGEy78i9fClWNhYnrp9kQ189PAi8EB98R2gC-oaWVFLdfCQxybA4L6Voql-9qYf4n9Q7clUHQRXUjo11B3w6Jmfy414RiyUKaUjK_ZrMknH9whoTkG9sl4hCJgMlfTeoRbfwHs33t9H0h9hkSmVPepONMU0SD_G8DQnp1Vos7iS4j2-LmRqnPPIQgc_jsS0yYdCE_InUPARyPXBGyZKpua11WJGCO334uzS1_0FnpcHT9yrIGvK4EHl7_yZOYNMQ6RU2nceNtSPkLfpL3-WMzjQro7amgk-XzI0yQdoFED4HBUofvXgt0XvHfhaEgLFJovECorQTOA";

export default function HomePage() {

    async function login() {
        try {
            const a = await axios.get(`https://auth.atlassian.com/authorize`, {
                params: {
                    'audience': 'api.atlassian.com',
                    'client_id': 'lT0mMzbiN07v71zmiB414fmJvlNJpNqN',
                    'scope': 'read%3Aissue%3Ajira%20write%3Aissue%3Ajira%20delete%3Aissue%3Ajira',
                    'redirect_uri': 'http://localhost:3200',
                    'state': 'q3Nk1eJ7CvAFD2F3898',
                    'response_type': 'code',
                    'prompt': 'consent'
                },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }
            });
        } catch (exception) {
            console.log(exception);
        }

        const b = 0;
    }

    const getAccessToken = async () => {
        try {
            const req = await axios({
                url: "https://auth.atlassian.com/oauth/token",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "grant_type": "authorization_code",
                    "client_id": "lT0mMzbiN07v71zmiB414fmJvlNJpNqN",
                    "client_secret": "ATOAlQyVzZL25VwbI_wM24x_9RxoMpRfEf33tQKQ2LOQMtrJN6CXwkV4Zq3Nk1eJ7CvAFD2F3898",
                    "code": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5MDI4YTU4OC01MzVjLTRkNmQtYjZmMy1iZTBkNGU2NThhOGEiLCJzdWIiOiI1ZmIyMmYzN2RkMGM1OTAwNzU4ZDhhZDEiLCJuYmYiOjE3MjU3MDUyNDUsImlzcyI6ImF1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTcyNTcwNTI0NSwiZXhwIjoxNzI1NzA1NTQ1LCJhdWQiOiJsVDBtTXpiaU4wN3Y3MXptaUI0MTRmbUp2bE5KcE5xTiIsImNsaWVudF9hdXRoX3R5cGUiOiJQT1NUIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vdWp0IjoiOTAyOGE1ODgtNTM1Yy00ZDZkLWI2ZjMtYmUwZDRlNjU4YThhIiwic2NvcGUiOlsibWFuYWdlOmppcmEtcHJvamVjdCIsIm1hbmFnZTpqaXJhLWNvbmZpZ3VyYXRpb24iLCJtYW5hZ2U6amlyYS1kYXRhLXByb3ZpZGVyIiwicmVhZDpqaXJhLXdvcmsiLCJtYW5hZ2U6amlyYS13ZWJob29rIiwid3JpdGU6amlyYS13b3JrIiwicmVhZDpqaXJhLXVzZXIiXSwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL2F0bF90b2tlbl90eXBlIjoiQVVUSF9DT0RFIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL2hhc1JlZGlyZWN0VXJpIjp0cnVlLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vc2Vzc2lvbl9pZCI6Ijg4MWQ4ZDNjLTEyNjgtNGZkZi04OTI4LTJlN2NkYWU4NmYxZiIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9wcm9jZXNzUmVnaW9uIjoidXMtd2VzdC0yIn0.ja52AXDtuJuCfzMjopHJsPJAIhwS-fwTHSsz4Bo6Z-E",
                    "redirect_uri": "http://localhost:3200"
                }
            });
            console.log(req);
        } catch (e) {
            console.log(e);
        }

    }

    

    const jiraApi = async (method: string, request: string, body: any) => {
        try {
            const req = await axios({
                url: `https://hunghung274.atlassian.net/${request}`,
                method: method,
                params: {
                    startAt: 0,
                    maxResults: 50,
                },
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(Constants.ApiKey + Constants.Username)
                }
            });
            console.log(req);
            return req;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    const render = () => {

        const onJiraClick = (key) => {
            setSelect(key);
        }

        if(!jira) return;

        return (
            jira.issues.map((x, id) => <p onClick={() => onJiraClick(x.key)} key={id}>Key: {x.key}, 
            Summary: {x.fields.summary},
            Status: {x.fields.status.name}, 
            Assignee: {x.fields.assignee.emailAddress}</p>)
        )
        
    }

    const getResource = async () => {
        const data = await jiraApi("GET", JiraRequest.AssignedToMe, {});
        setJira(data.data);

    }

    const getTransition = async () => {
        const data = await jiraApi("GET", JiraRequest.GetTransition(select), {});
    }
    
    const transition = async () => {
        const data = await jiraApi("POST", JiraRequest.Transition(select), {
            "transition": {
                "id": 21
            }
        });
    }

    const changeAssignee = async () => {
        const data = await jiraApi("PUT", JiraRequest.ChangeAssignee(select), {
            "accountId": "712020:8d4e34ad-703c-4600-a854-525f40dc386e"
        });
    }

    const createIssue = async () => {
        const data = await jiraApi("POST", JiraRequest.CreateIssue, {
            "fields": {
                "project": {
                    "id": 10000
                },
                "issuetype": {
                    "id": "10003"
                },
                "summary": "Yay! New issues was created"
            }
        });
    }

    useEffect(() => {
        console.log(sampleData);
        setJira(sampleData);
    },[])

    const [jira, setJira] = useState(undefined);
    const [select, setSelect] = useState("");


    return (
        <div>
            <button onClick={() => login()}>Log in Jira</button>

            <button onClick={() => getAccessToken()}>Get access token</button>

            <button onClick={() => getResource()}>Get All Issues</button>

            <br/>

            <p>Current Select: {select}</p>
            <div>
                {render()}
            </div>

            <button onClick={() => getTransition()}>Get All Issues</button>
            <button onClick={() => transition()}>Get All Issues</button>
        </div>
    );
}