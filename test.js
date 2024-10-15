import http from "k6/http";
import { sleep } from "k6";

export const options = {
    // A number specifying the number of VUs to run concurrently.
    vus: 100,
    // A string specifying the total duration of the test run.
    duration: "1m",
    cloud: {
        projectID: 3717469,
        // Test runs with the same name groups test runs together
        name: "YOUR TEST NAME",
    },
    // The following section contains configuration options for execution of this
    // test script in Grafana Cloud.
    //
    // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
    // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
    //
    // cloud: {
    //   // The ID of the project to which the test is assigned in the k6 Cloud UI.
    //   // By default tests are executed in default project.
    //   projectID: "",
    //   // The name of the test in the k6 Cloud UI.
    //   // Test runs with the same name will be grouped.
    //   name: "test.js"
    // },

    // Uncomment this section to enable the use of Browser API in your tests.
    //
    // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
    // about using Browser API in your test scripts.
    //
    // scenarios: {
    //   // The scenario name appears in the result summary, tags, and so on.
    //   // You can give the scenario any name, as long as each name in the script is unique.
    //   ui: {
    //     // Executor is a mandatory parameter for browser-based tests.
    //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
    //     //
    //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
    //     executor: 'shared-iterations',
    //     options: {
    //       browser: {
    //         // This is a mandatory parameter that instructs k6 to launch and
    //         // connect to a chromium-based browser, and use it to run UI-based
    //         // tests.
    //         type: 'chromium',
    //       },
    //     },
    //   },
    // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    const url = "https://gitvgil-get-commit.kartik20044.workers.dev";
    const payload = JSON.stringify({
        encryptedToken:
            "f0855ee235524d370ab2e22fbd56c0c9e3e6bccf7735b0fe8c270c36ebe9a659e770c44854dc53b21516a5edebd7002ed578cd588f4af62a4f321b79ba8d93caf1003e22ab98e8e79", // Replace with your actual encrypted token
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Perform the POST request
    const res = http.post(url, payload, params);

    // Log the response status and body for debugging
    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);
    // Optional: Check that the response status is 200 OK
    if (res.status !== 200) {
        console.error(`Error: ${res.status} ${res.body}`);
    }

    sleep(1); // Simulate the time between requests
}
