import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { askMasterConnect } from "../../services/masterConnect";

export default function MasterConnectScreen() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleAsk() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await askMasterConnect(
        query,
        "personal"
      );

      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Ask the Graph
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Who should I re-engage this week?"
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 12,
          padding: 16,
          minHeight: 100,
          marginBottom: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleAsk}
        style={{
          backgroundColor: "#6D28D9",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {loading ? "Thinking..." : "Ask"}
        </Text>
      </TouchableOpacity>

      {result && (
        <View
          style={{
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Summary
          </Text>

          <Text
            style={{
              marginTop: 8,
            }}
          >
            {result.summary}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}