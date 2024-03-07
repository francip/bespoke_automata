export const chat_history_class_name = "ChatHistory";

export const chatHistoryProperties = [
    {
        name: "message",
        dataType: ["string"],
    },
    {
        name: "timestamp",
        dataType: ["number"],
    },
    {
        name: "party_id",
        dataType: ["string"],
    },
    {
        name: "counterparty_id",
        dataType: ["string"],
    },
];

export const preloaded_facts_class_name = "PreloadedFacts";

export const preloadedFactProperties = [
    {
        name: "fact",
        dataType: ["string"],
    },
    {
        name: "timestamp",
        dataType: ["number"],
    },
    {
        name: "party_id",
        dataType: ["string"],
    },
];

export const goals_class_name = "Goals";

export const goalProperties = [
    {
        name: "goal",
        dataType: ["string"],
    },
    {
        name: "timestamp",
        dataType: ["number"],
    },
    {
        name: "party_id",
        dataType: ["string"],
    },
    {
        name: "completed",
        dataType: ["boolean"],
    },
];

export const internal_thoughts_class_name = "InternalThoughts";

export const internalThoughtProperties = [
    {
        name: "thought",
        dataType: ["string"],
    },
    {
        name: "timestamp",
        dataType: ["number"],
    },
    {
        name: "party_id",
        dataType: ["string"],
    },
];

export const websites_class_name = "Websites";

export const websiteProperties = [
    {
        name: "url",
        dataType: ["string"],
    },
    {
        name: "text",
        dataType: ["string"],
    },
    {
        name: "timestamp",
        dataType: ["number"],
    },
    {
        name: "party_id",
        dataType: ["string"],
    },
];

export const schema = [
    {
        class: chat_history_class_name,
        description: "Chat history of the user",
        properties: chatHistoryProperties,
    },
    {
        class: preloaded_facts_class_name,
        description: "Facts that are preloaded into the system",
        properties: preloadedFactProperties,
    },
    {
        class: goals_class_name,
        description: "Goals that the bot has set",
        properties: goalProperties,
    },
    {
        class: internal_thoughts_class_name,
        description: "Internal thoughts of the bot",
        properties: internalThoughtProperties,
    },
    {
        class: websites_class_name,
        description: "Websites that the bot has visited",
        properties: websiteProperties,
    },
];
