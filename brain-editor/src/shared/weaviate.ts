interface ClassDefinition {
    class: string;
    properties: PropertyDefinition[];
    description?: string;
}

interface PropertyDefinition {
    name: string;
    dataType: string[];
}

interface QueryOptions {
    className: string;
    queryText?: string;
    count?: number;
}

class Weaviate {
    static WEAVIATE_URL = "http://192.168.0.7:8080";

    async initSchema(new_schema: ClassDefinition[]): Promise<void> {
        const currentSchema = await this.fetchSchema();
        for (let i = 0; i < new_schema.length; i++) {
            const className = new_schema[i].class;
            const classExists = currentSchema.classes.find(
                (c) => c.class === className
            );
            if (!classExists) {
                await this.createClass(className, new_schema[i].properties);
            }
        }
    }

    async wipeSchema(): Promise<void> {
        const currentSchema = await this.fetchSchema();
        for (let i = 0; i < currentSchema.classes.length; i++) {
            const className = currentSchema.classes[i].class;
            await this.deleteClass(className);
        }
    }

    async fetchSchema(): Promise<any> {
        try {
            const response = await fetch(Weaviate.WEAVIATE_URL + `/v1/schema`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch schema:", error);
            return null;
        }
    }

    async createClass(
        className: string,
        properties: PropertyDefinition[]
    ): Promise<void> {
        const schema = await this.fetchSchema();
        const classExists = schema.classes.find((c) => c.class === className);
        if (classExists) {
            return;
        }

        const classDefinition: ClassDefinition = {
            class: className,
            properties: properties,
            description: "A collection of " + className,
        };
        let class_string = JSON.stringify(classDefinition);
        const response = await fetch(`${Weaviate.WEAVIATE_URL}/v1/schema/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: class_string,
        });
        const responseBody = await response.json();
    }

    async addRecord(className: string, data: any): Promise<any> {
        const response = await fetch(`${Weaviate.WEAVIATE_URL}/v1/objects`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                class: className,
                properties: data,
            }),
        });
        return response.json();
    }

    async queryClass(className: string, queryText: string): Promise<any> {
        const response = await fetch(
            `${Weaviate.WEAVIATE_URL}/v1/objects?q=${encodeURIComponent(
                queryText
            )}&classes[]=${className}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        return response.json();
    }

    async deleteRecord(className: string, recordId: string): Promise<Response> {
        const response = await fetch(
            `${Weaviate.WEAVIATE_URL}/v1/${className}/${recordId}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        return response;
    }

    async deleteClass(className: string): Promise<Response> {
        const response = await fetch(
            `${Weaviate.WEAVIATE_URL}/v1/schema/${className}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        return response;
    }

    async updateRecord(
        className: string,
        recordId: string,
        data: any
    ): Promise<any> {
        const response = await fetch(
            `${Weaviate.WEAVIATE_URL}/v1/${className}/${recordId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return response.json();
    }

    async advancedQuery(
        className: string,
        queryText: string,
        count: number = 10
    ): Promise<any> {
        const url = Weaviate.WEAVIATE_URL + "/v1/graphql";
        const cleanedQueryText = queryText.replace(/[\n\r\t]/g, " ");

        const data = {
            query: `
          {
            Get {
              ${className}(
                limit: ${count},
                nearText: {
                  concepts: ["${cleanedQueryText}"],
                }
              ){ text }
            }
          }`,
        };

        let data_string = JSON.stringify(data);
        console.log(data_string);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data_string,
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    }

    async getRecordById(className: string, recordId: string): Promise<any> {
        const response = await fetch(
            `${Weaviate.WEAVIATE_URL}/v1/objects/${recordId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    async classExists(className: string): Promise<boolean> {
        const schema = await this.fetchSchema();
        const classExists = schema.classes.find((c) => c.class === className);
        return !!classExists;
    }
}

export default Weaviate;
