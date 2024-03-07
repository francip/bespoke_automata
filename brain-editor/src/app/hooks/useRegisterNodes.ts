import { useEffect } from "react";
import { LiteGraph } from "litegraph.js";
import {
    Text_Node,
    Random_Selection_Node,
    Prefix_Text_Node,
    Suffix_Text_Node,
    Concatenate_Text_Node,
    Weaviate_Ingest_Node,
    Weaviate_Query_Node,
    Text_Input_Node,
    Text_Output_Node,
    Img_URL_To_Base64_Node,
    Vision_Node,
    Audio_Generation_Node,
    Start_Node,
    Counter_Node,
    Triggered_Number_Output_Node,
    Triggered_Text_Output_Node,
    Add_Node,
    Random_Number_Node,
    Gate,
    JSON_API_Node,
    GPT_Node,
    Password_Node,
    Prompt_Gate_GPT,
    Simple_Vector_DB_Read_Node,
    Simple_Vector_DB_Write_Node,
    Brain_Node,
    Variable_Forward_Node,
    Dictionary_Assembler_Node,
    Global_Variable_Get_Node,
    Global_Variable_Set_Node,
    Array_Assembler_Node,
    Array_Item_Forward_Node,
    Array_Stepper_Node,
    Random_Array_Item_Node,
    Random_Dictionary_Item_Node,
    Note_Node,
    Time_Node,
    Keyword_Extraction_Node,
    Dictionary_Bus_Input_Node,
    Dictionary_Bus_Output_Node,
    Dictionary_Bus_Get_Node,
    Dictionary_Bus_Set_Node,
    Multiline_Text_Node,
} from "./nodes";

const useRegisterNodes = () => {
    useEffect(() => {
        LiteGraph.clearRegisteredTypes();

        LiteGraph.registerNodeType("Text/Text", Text_Node);
        LiteGraph.registerNodeType("Text/Random Text", Random_Selection_Node);
        LiteGraph.registerNodeType("Text/Prefix Text", Prefix_Text_Node);
        LiteGraph.registerNodeType("Text/Suffix Text", Suffix_Text_Node);
        LiteGraph.registerNodeType(
            "Text/Concatenate Text",
            Concatenate_Text_Node
        );
        LiteGraph.registerNodeType(
            "Storage/Weaviate Store",
            Weaviate_Ingest_Node
        );
        LiteGraph.registerNodeType(
            "Storage/Weaviate Query",
            Weaviate_Query_Node
        );
        LiteGraph.registerNodeType("IO/Text Input", Text_Input_Node);
        LiteGraph.registerNodeType("IO/Text Output", Text_Output_Node);
        LiteGraph.registerNodeType(
            "Image/URL to Base64",
            Img_URL_To_Base64_Node
        );
        LiteGraph.registerNodeType("LLM/Vision", Vision_Node);
        LiteGraph.registerNodeType(
            "Audio/Audio Generation",
            Audio_Generation_Node
        );
        LiteGraph.registerNodeType("Control/Start", Start_Node);
        LiteGraph.registerNodeType("Control/Counter", Counter_Node);
        LiteGraph.registerNodeType(
            "Control/Number Output",
            Triggered_Number_Output_Node
        );
        LiteGraph.registerNodeType(
            "Control/Text Output",
            Triggered_Text_Output_Node
        );
        LiteGraph.registerNodeType("Math/Add", Add_Node);
        LiteGraph.registerNodeType("Text/Random Number", Random_Number_Node);
        LiteGraph.registerNodeType("Control/Gate", Gate);
        LiteGraph.registerNodeType("API/JSON API", JSON_API_Node);
        LiteGraph.registerNodeType("LLM/GPT", GPT_Node);
        LiteGraph.registerNodeType("Text/Password", Password_Node);
        LiteGraph.registerNodeType(
            "Control/Prompt Gate (GPT)",
            Prompt_Gate_GPT
        );
        LiteGraph.registerNodeType(
            "Storage/Simple Vector DB Read",
            Simple_Vector_DB_Read_Node
        );
        LiteGraph.registerNodeType(
            "Storage/Simple Vector DB Write",
            Simple_Vector_DB_Write_Node
        );
        LiteGraph.registerNodeType("Brains/Brain", Brain_Node);
        LiteGraph.registerNodeType(
            "Text/Variable Forward",
            Variable_Forward_Node
        );
        LiteGraph.registerNodeType(
            "Text/Dictionary Assembler",
            Dictionary_Assembler_Node
        );
        LiteGraph.registerNodeType(
            "Control/Global Variable Get",
            Global_Variable_Get_Node
        );
        LiteGraph.registerNodeType(
            "Control/Global Variable Set",
            Global_Variable_Set_Node
        );
        LiteGraph.registerNodeType(
            "Text/Array Assembler",
            Array_Assembler_Node
        );
        LiteGraph.registerNodeType(
            "Text/Array Item Forward",
            Array_Item_Forward_Node
        );
        LiteGraph.registerNodeType("Control/Array Stepper", Array_Stepper_Node);
        LiteGraph.registerNodeType(
            "Control/Random Array Item",
            Random_Array_Item_Node
        );
        LiteGraph.registerNodeType(
            "Control/Random Dictionary Item",
            Random_Dictionary_Item_Node
        );
        LiteGraph.registerNodeType("System/Note", Note_Node);
        LiteGraph.registerNodeType("System/Time", Time_Node);
        LiteGraph.registerNodeType(
            "Text/Keyword Extraction",
            Keyword_Extraction_Node
        );
        LiteGraph.registerNodeType(
            "IO/Dictionary Bus Input",
            Dictionary_Bus_Input_Node
        );
        LiteGraph.registerNodeType(
            "IO/Dictionary Bus Output",
            Dictionary_Bus_Output_Node
        );
        LiteGraph.registerNodeType(
            "IO/Dictionary Bus Get",
            Dictionary_Bus_Get_Node
        );
        LiteGraph.registerNodeType(
            "IO/Dictionary Bus Set",
            Dictionary_Bus_Set_Node
        );
        LiteGraph.registerNodeType("Text/Multiline Text", Multiline_Text_Node);

        return () => {
            // Cleanup function (if needed)
        };
    }, []);
};

export default useRegisterNodes;
