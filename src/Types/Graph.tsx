import React, { ReactNode } from "react";

// pathway
// full json string --> array of tasks --> create graphs for task --> create single graph

interface Metric {
    name: string;
    content: ReactNode;
}

type FullJSON = {[jobname: string]: JobJSON};
export const parseJson = (raw: string): [string, Metric[]][] => {
    // Parse the json
    const parsedData: FullJSON = JSON.parse(raw);

    // We don't know how many jobs we have, so let's get the keys and go thru each
    const keys = Object.keys(parsedData);
    const allJobs = [];

    // Going through all keys
    for(const key in keys) {
        // Parse the job
        const D: [string, Metric[]] = parseJob(parsedData[key]);
        allJobs.push(D);
    }

    // Return all jobs
    return allJobs;
};

type JobJSON = {name: string, metrics: MetricsJSON};
export const parseJob = (json: JobJSON): [string, Metric[]] => {
    // Single job looks like {name:”Docker 2”, metrics:{“Percent Compl”:{type:”progressbar”,x_min:0,x_max:100,value:32}}
    const jobName = json.name;
    const metrics = json.metrics;
    return [jobName, parseMetrics(metrics)];
};

type MetricsJSON = {[key: string]: MetricJSON};
export const parseMetrics = (json: MetricsJSON): Metric[] => {
    // For each metric key in this json, that represents a single metric --> name, content
    const metricKeys = Object.keys(json);

    const allMetrics = [];
    for(const key in metricKeys) {
        // Have a single metric
        const D: Metric = {name: key, content: parseMetric(json[key])};
        allMetrics.push(D);
    }

    return allMetrics;
};

type MetricJSON = {type: string, [key: string]: string | number | boolean};
export const parseMetric = (json: MetricJSON): ReactNode => {
    //type:”progressbar”,x_min:0,x_max:100,value:32}
    const type = json.type;
    switch(type) {
        case "progressbar":
            // create a progress bar
            break;
        case "histogram":
            // create a histogram
            break;
        case "linegraph":
            // create a line graph
            break;
        case "stemandleaf":
            // create stem and leaf plot
            break;
        default:
            return (<></>);
    }
};

