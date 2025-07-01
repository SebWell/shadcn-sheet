<template>
  <!-- Backdrop -->
  <teleport to="body">
    <div
      v-if="isOpen"
      :class="cn(
        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )"
      @click="handleBackdropClick"
    />
    
    <!-- Sheet container -->
    <div
      v-if="isOpen"
      :class="cn(
        'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
        // Side positioning
        content.side === 'top' ? 'inset-x-0 top-0 border-b' : '',
        content.side === 'bottom' ? 'inset-x-0 bottom-0 border-t' : '',
        content.side === 'left' ? 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm' : '',
        content.side === 'right' ? 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm' : '',
        // Animation classes
        content.side === 'top' ? 'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top' : '',
        content.side === 'bottom' ? 'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom' : '',
        content.side === 'left' ? 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left' : '',
        content.side === 'right' ? 'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right' : '',
        content.customClass
      )"
      :style="content.customStyle"
      role="dialog"
      :aria-labelledby="content.title ? 'sheet-title' : undefined"
      :aria-describedby="content.description ? 'sheet-description' : undefined"
      @keydown="handleKeyDown"
      tabindex="-1"
    >
      <!-- Header -->
      <div v-if="content.showHeader !== false" class="flex flex-col space-y-1.5 text-center sm:text-left">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h2
              v-if="content.title"
              id="sheet-title"
              class="text-lg font-semibold leading-none tracking-tight"
            >
              {{ content.title }}
            </h2>
            <p
              v-if="content.description"
              id="sheet-description"
              class="text-sm text-muted-foreground"
            >
              {{ content.description }}
            </p>
          </div>
          
          <!-- Close button -->
          <button
            v-if="content.showClose !== false"
            @click="closeSheet"
            :class="cn(
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
            )"
            :aria-label="content.closeLabel || 'Close'"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content area -->
      <div 
        :class="cn(
          'flex-1 overflow-auto',
          content.contentClass
        )"
      >
        <!-- Custom content slot -->
        <div v-if="content.content" v-html="content.content" />
        
        <!-- Form content -->
        <div v-if="content.fields && content.fields.length > 0" class="space-y-4">
          <div
            v-for="(field, index) in content.fields"
            :key="field.id || index"
            class="space-y-2"
          >
            <label
              v-if="field.label"
              :for="`field-${index}`"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ field.label }}
              <span v-if="field.required" class="text-destructive">*</span>
            </label>
            
            <!-- Input field -->
            <input
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
              :id="`field-${index}`"
              :type="field.type"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              v-model="field.value"
              :class="cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              )"
            />
            
            <!-- Textarea -->
            <textarea
              v-else-if="field.type === 'textarea'"
              :id="`field-${index}`"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              v-model="field.value"
              :rows="field.rows || 3"
              :class="cn(
                'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              )"
            />
            
            <!-- Select -->
            <select
              v-else-if="field.type === 'select'"
              :id="`field-${index}`"
              :required="field.required"
              :disabled="field.disabled"
              v-model="field.value"
              :class="cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              )"
            >
              <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
              <option
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            
            <!-- Checkbox -->
            <div v-else-if="field.type === 'checkbox'" class="flex items-center space-x-2">
              <input
                :id="`field-${index}`"
                type="checkbox"
                :required="field.required"
                :disabled="field.disabled"
                v-model="field.value"
                class="h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary"
              />
              <label
                :for="`field-${index}`"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ field.checkboxLabel || field.label }}
              </label>
            </div>
            
            <p v-if="field.description" class="text-sm text-muted-foreground">
              {{ field.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer with actions -->
      <div
        v-if="content.showFooter !== false && (content.actions && content.actions.length > 0)"
        :class="cn(
          'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
          content.footerClass
        )"
      >
        <button
          v-for="(action, index) in content.actions"
          :key="action.id || index"
          @click="handleAction(action)"
          :disabled="action.disabled"
          :class="cn(
            'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            // Action variants
            action.variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
            action.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : '',
            action.variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : '',
            action.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : '',
            action.variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : '',
            action.variant === 'link' ? 'text-primary underline-offset-4 hover:underline' : '',
            !action.variant ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
            action.customClass
          )"
        >
          <component
            v-if="action.icon"
            :is="action.icon"
            class="mr-2 h-4 w-4"
          />
          {{ action.label }}
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open', 'close', 'action-click', 'field-change'],
  setup(props, { emit }) {
    // Import utility function
    const cn = (...inputs) => {
      return inputs.filter(Boolean).join(' ')
    }

    const isOpen = ref(props.open)

    // Watch for external open changes
    watch(() => props.open, (newValue) => {
      isOpen.value = newValue
      if (newValue) {
        // Focus the sheet when opened
        nextTick(() => {
          const sheetElement = document.querySelector('[role="dialog"]')
          if (sheetElement) {
            sheetElement.focus()
          }
        })
      }
    })

    const closeSheet = () => {
      isOpen.value = false
      emit('update:open', false)
      emit('close')
    }

    const handleBackdropClick = () => {
      if (props.content.closeOnBackdrop !== false) {
        closeSheet()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && props.content.closeOnEscape !== false) {
        event.preventDefault()
        closeSheet()
      }
    }

    const handleAction = (action) => {
      // Emit action event with form data if available
      const formData = {}
      if (props.content.fields) {
        props.content.fields.forEach((field, index) => {
          formData[field.id || `field_${index}`] = field.value
        })
      }

      emit('action-click', {
        action,
        formData,
        fields: props.content.fields
      })

      // Close sheet if action specifies it
      if (action.closeSheet !== false && action.variant !== 'secondary') {
        closeSheet()
      }
    }

    // Handle clicks outside when sheet is open
    const handleClickOutside = (event) => {
      if (isOpen.value && props.content.closeOnBackdrop !== false) {
        const sheetElement = document.querySelector('[role="dialog"]')
        if (sheetElement && !sheetElement.contains(event.target)) {
          closeSheet()
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      cn,
      isOpen,
      closeSheet,
      handleBackdropClick,
      handleKeyDown,
      handleAction
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 