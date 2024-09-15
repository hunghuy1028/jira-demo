const Constants = {
    ApiKey: "",
    Username: "hunghung274@gmail.com",
    ClientId: "", // contact me to get key
    ClientSecret: "", // contact me to get key
    StateCode: "HelloWord"
}

const JiraRequest = {
    AssignedToMe: "rest/api/2/search?jql=assignee=currentuser()",
    GetTransition: (key) => `rest/api/3/issue/${key}/transitions`, // GET
    Transition: (key) => `rest/api/3/issue/${key}/transitions`, // POST
    AllUsers: `rest/api/3/users`, // GET
    ChangeAssignee: (key) => `rest/api/3/issue/${key}/assignee`, // PUT
    CreateIssue: "rest/api/3/issue", //POST
}

export { Constants, JiraRequest };
