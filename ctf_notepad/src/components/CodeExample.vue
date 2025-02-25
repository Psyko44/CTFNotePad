<template>
  <div class="code-example">
    <div class="code-header">
      <span class="code-title">{{ title }}</span>
      <div class="code-actions">
        <v-btn
          size="small"
          icon
          color="primary"
          variant="text"
          @click="copyToClipboard(code)"
          :title="'Copier'"
        >
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn
          size="small"
          icon
          color="primary"
          variant="text"
          @click="copyToClipboard(btoa(code))"
          :title="'Copier en Base64'"
        >
          <v-icon>mdi-code-brackets</v-icon>
        </v-btn>
        <v-btn
          size="small"
          icon
          color="primary"
          variant="text"
          @click="copyToClipboard(encodeURIComponent(code))"
          :title="'Copier en URL Encode'"
        >
          <v-icon>mdi-percent</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="explanation" class="code-explanation">
      {{ explanation }}
    </div>
    <pre class="code-content" :class="language"><code>{{ code }}</code></pre>
    <div v-if="showEncodedVersions" class="encoded-versions">
      <div class="encoded-version">
        <div class="encoded-title">Base64:</div>
        <pre class="encoded-content"><code>{{ base64Version }}</code></pre>
      </div>
      <div class="encoded-version">
        <div class="encoded-title">URL Encoded:</div>
        <pre class="encoded-content"><code>{{ urlEncodedVersion }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: ''
  },
  explanation: {
    type: String,
    default: ''
  }
})

const showEncodedVersions = ref(false)

const base64Version = computed(() => btoa(props.code))
const urlEncodedVersion = computed(() => encodeURIComponent(props.code))

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
.code-example {
  background-color: #1e1e1e;
  border-radius: 4px;
  margin: 8px 0;
  padding: 8px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.code-title {
  font-weight: bold;
  color: #e0e0e0;
}

.code-actions {
  display: flex;
  gap: 4px;
}

.code-explanation {
  font-size: 0.9em;
  color: #f70101;
  margin-bottom: 8px;
  font-style: italic;
}

.code-content {
  background-color: #2d2d2d;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  font-family: 'Consolas', monospace;
  color: #e0e0e0;
}

.encoded-versions {
  margin-top: 8px;
  border-top: 1px solid #444;
  padding-top: 8px;
}

.encoded-version {
  margin-top: 8px;
}

.encoded-title {
  font-weight: bold;
  color: #888;
  margin-bottom: 4px;
}

.encoded-content {
  background-color: #2d2d2d;
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
  font-family: 'Consolas', monospace;
  color: #e0e0e0;
  font-size: 0.9em;
}

.python {
  color: yellow;
}

.php {
  color: #8892BF;
}

.powershell {
  color: rgb(59, 239, 245);
}

.jsp {
  color: #EC2025;
}
</style>
