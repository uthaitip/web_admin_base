<template>
  <div class="space-y-8">

    <!-- BaseTopicHeader Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseTopicHeader Component</h3>
            <p class="text-sm">Flexible header component with title, subtitle, back button, and action slots.</p>
          </div>
        </div>

        <!-- Basic Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            Basic Examples
          </h3>
          <div class="space-y-4">
            <!-- Basic Header -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader title="Basic Header" />
            </div>
            
            <!-- With Subtitle -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader 
                title="Header with Subtitle" 
                subtitle="This is a descriptive subtitle"
              />
            </div>
            
            <!-- With Back Button -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader 
                title="With Back Button" 
                subtitle="Click the arrow to go back"
                :isBack="true" 
                @back="console.log('Back clicked')"
              />
            </div>
            
            <!-- With Actions -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader title="With Actions">
                <template #actions>
                  <div class="flex gap-2">
                    <BaseButton label="Edit" variant="ghost" size="sm" />
                    <BaseButton label="Save" variant="primary" size="sm" />
                  </div>
                </template>
              </BaseTopicHeader>
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Size Variants
          </h3>
          <div class="space-y-4">
            <!-- Small -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader 
                title="Small Header" 
                subtitle="Small size variant"
                size="sm"
              />
            </div>
            
            <!-- Medium (Default) -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader 
                title="Medium Header" 
                subtitle="Medium size variant (default)"
                size="md"
              />
            </div>
            
            <!-- Large -->
            <div class="bg-base-100 rounded-lg p-4">
              <BaseTopicHeader 
                title="Large Header" 
                subtitle="Large size variant"
                size="lg"
              />
            </div>
          </div>
        </div>

        <!-- Custom Styling -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="swatch" size="sm" />
            Custom Styling
          </h3>
          <div class="bg-base-100 rounded-lg p-4">
            <BaseTopicHeader 
              title="Styled Header" 
              subtitle="Custom colors and classes"
              titleClass="text-primary"
              subtitleClass="text-secondary"
            />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;!-- Basic --&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseTopicHeader title="Page Title" /&gt;</code></pre>
            <pre data-prefix="3"><code></code></pre>
            <pre data-prefix="4"><code>&lt;!-- With subtitle and back button --&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseTopicHeader</code></pre>
            <pre data-prefix="6"><code>  title="User Profile"</code></pre>
            <pre data-prefix="7"><code>  subtitle="Manage your account settings"</code></pre>
            <pre data-prefix="8"><code>  :isBack="true"</code></pre>
            <pre data-prefix="9"><code>  @back="goBack"</code></pre>
            <pre data-prefix="10"><code>&gt;</code></pre>
            <pre data-prefix="11"><code>  &lt;template #actions&gt;</code></pre>
            <pre data-prefix="12"><code>    &lt;BaseButton label="Save" variant="primary" /&gt;</code></pre>
            <pre data-prefix="13"><code>  &lt;/template&gt;</code></pre>
            <pre data-prefix="14"><code>&lt;/BaseTopicHeader&gt;</code></pre>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>title: string</code> - Header title (required)</div>
            <div><code>subtitle?: string</code> - Optional subtitle text</div>
            <div><code>size?: 'sm' | 'md' | 'lg'</code> - Header size variant</div>
            <div><code>titleClass?: string</code> - Additional CSS classes for title</div>
            <div><code>subtitleClass?: string</code> - Additional CSS classes for subtitle</div>
            <div><code>isBack?: boolean</code> - Show back arrow button</div>
          </div>
        </div>

        <!-- Events Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bolt" size="sm" />
            Events
          </h3>
          <div class="text-xs space-y-1">
            <div><code>@back</code> - Emitted when back button is clicked</div>
          </div>
        </div>

        <!-- Slots Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="squares-plus" size="sm" />
            Slots
          </h3>
          <div class="text-xs space-y-1">
            <div><code>#actions</code> - Content for action buttons (right side)</div>
          </div>
        </div>
      </div>
    </div>
    <!-- BaseIcon Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseIcon Component</h3>
            <p class="text-sm">Standardized icon component using Heroicons with consistent sizing and variants.</p>
          </div>
        </div>

        <!-- Size Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Icon Sizes
          </h3>
          <div class="flex items-center gap-4 flex-wrap">
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="xs" class="text-error" />
              <code class="text-xs">xs (16px)</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="sm" class="text-error" />
              <code class="text-xs">sm (20px)</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="md" class="text-error" />
              <code class="text-xs">md (24px)</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-error" />
              <code class="text-xs">lg (32px)</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="xl" class="text-error" />
              <code class="text-xs">xl (40px)</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-2 rounded bg-base-100">
              <BaseIcon name="heart" size="2xl" class="text-error" />
              <code class="text-xs">2xl (48px)</code>
            </div>
          </div>
        </div>

        <!-- Variant Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="swatch" size="sm" />
            Icon Variants
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col items-center gap-2 p-4 rounded bg-base-100">
              <BaseIcon name="star" variant="outline" size="2xl" class="text-warning" />
              <code class="text-xs">outline</code>
              <span class="text-xs text-base-content/60">Default style</span>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 rounded bg-base-100">
              <BaseIcon name="star" variant="solid" size="2xl" class="text-warning" />
              <code class="text-xs">solid</code>
              <span class="text-xs text-base-content/60">Filled style</span>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 rounded bg-base-100">
              <BaseIcon name="star" variant="mini" size="2xl" class="text-warning" />
              <code class="text-xs">mini</code>
              <span class="text-xs text-base-content/60">20px mini style</span>
            </div>
          </div>
        </div>

        <!-- Color Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="paint-brush" size="sm" />
            Color Examples
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-primary" />
              <code class="text-xs">text-primary</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-secondary" />
              <code class="text-xs">text-secondary</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-accent" />
              <code class="text-xs">text-accent</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-success" />
              <code class="text-xs">text-success</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-warning" />
              <code class="text-xs">text-warning</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-error" />
              <code class="text-xs">text-error</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-info" />
              <code class="text-xs">text-info</code>
            </div>
            <div class="flex flex-col items-center gap-2 p-3 rounded bg-base-100">
              <BaseIcon name="heart" size="lg" class="text-base-content/50" />
              <code class="text-xs">text-base-content/50</code>
            </div>
          </div>
        </div>

        <!-- Popular Icons Grid -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="sparkles" size="sm" />
            Popular Icons
          </h3>
          <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="heart">
              <BaseIcon name="heart" size="lg" />
              <code class="text-xs">heart</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="star">
              <BaseIcon name="star" size="lg" />
              <code class="text-xs">star</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="home">
              <BaseIcon name="home" size="lg" />
              <code class="text-xs">home</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="user">
              <BaseIcon name="user" size="lg" />
              <code class="text-xs">user</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="cog-6-tooth">
              <BaseIcon name="cog-6-tooth" size="lg" />
              <code class="text-xs">cog-6-tooth</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="bell">
              <BaseIcon name="bell" size="lg" />
              <code class="text-xs">bell</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="envelope">
              <BaseIcon name="envelope" size="lg" />
              <code class="text-xs">envelope</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="phone">
              <BaseIcon name="phone" size="lg" />
              <code class="text-xs">phone</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="magnifying-glass">
              <BaseIcon name="magnifying-glass" size="lg" />
              <code class="text-xs">search</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="shopping-cart">
              <BaseIcon name="shopping-cart" size="lg" />
              <code class="text-xs">cart</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="calendar-days">
              <BaseIcon name="calendar-days" size="lg" />
              <code class="text-xs">calendar</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="clock">
              <BaseIcon name="clock" size="lg" />
              <code class="text-xs">clock</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="map-pin">
              <BaseIcon name="map-pin" size="lg" />
              <code class="text-xs">location</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="camera">
              <BaseIcon name="camera" size="lg" />
              <code class="text-xs">camera</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="photo">
              <BaseIcon name="photo" size="lg" />
              <code class="text-xs">photo</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="document-text">
              <BaseIcon name="document-text" size="lg" />
              <code class="text-xs">document</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="folder">
              <BaseIcon name="folder" size="lg" />
              <code class="text-xs">folder</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="trash">
              <BaseIcon name="trash" size="lg" />
              <code class="text-xs">trash</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="pencil">
              <BaseIcon name="pencil" size="lg" />
              <code class="text-xs">pencil</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="check">
              <BaseIcon name="check" size="lg" />
              <code class="text-xs">check</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="x-mark">
              <BaseIcon name="x-mark" size="lg" />
              <code class="text-xs">x-mark</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="plus">
              <BaseIcon name="plus" size="lg" />
              <code class="text-xs">plus</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="minus">
              <BaseIcon name="minus" size="lg" />
              <code class="text-xs">minus</code>
            </div>
            <div class="flex flex-col items-center gap-1 p-2 rounded hover:bg-base-100 cursor-pointer transition-colors" title="arrow-right">
              <BaseIcon name="arrow-right" size="lg" />
              <code class="text-xs">arrow-right</code>
            </div>
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;!-- Basic icon --&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseIcon name="user" /&gt;</code></pre>
            <pre data-prefix="3"><code></code></pre>
            <pre data-prefix="4"><code>&lt;!-- With size and color --&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseIcon name="heart" size="lg" class="text-error" /&gt;</code></pre>
            <pre data-prefix="6"><code></code></pre>
            <pre data-prefix="7"><code>&lt;!-- Solid variant --&gt;</code></pre>
            <pre data-prefix="8"><code>&lt;BaseIcon name="star" variant="solid" class="text-warning" /&gt;</code></pre>
            <pre data-prefix="9"><code></code></pre>
            <pre data-prefix="10"><code>&lt;!-- In buttons --&gt;</code></pre>
            <pre data-prefix="11"><code>&lt;BaseButton&gt;</code></pre>
            <pre data-prefix="12"><code>  &lt;BaseIcon name="plus" size="sm" class="mr-2" /&gt;</code></pre>
            <pre data-prefix="13"><code>  Add Item</code></pre>
            <pre data-prefix="14"><code>&lt;/BaseButton&gt;</code></pre>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>name: string</code> - HeroIcon name (required)</div>
            <div><code>variant?: 'outline' | 'solid' | 'mini'</code> - Icon style (default: 'outline')</div>
            <div><code>size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code> - Icon size (default: 'md')</div>
            <div><code>class?: string</code> - Additional CSS classes</div>
          </div>
        </div>

        <!-- Common Use Cases -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="light-bulb" size="sm" />
            Common Use Cases
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-base-100 p-3 rounded">
              <h5 class="font-medium mb-2 text-sm">Navigation & UI</h5>
              <div class="flex flex-wrap gap-2">
                <BaseIcon name="home" size="sm" class="text-base-content/60" />
                <BaseIcon name="user" size="sm" class="text-base-content/60" />
                <BaseIcon name="cog-6-tooth" size="sm" class="text-base-content/60" />
                <BaseIcon name="bars-3" size="sm" class="text-base-content/60" />
                <BaseIcon name="magnifying-glass" size="sm" class="text-base-content/60" />
              </div>
            </div>
            <div class="bg-base-100 p-3 rounded">
              <h5 class="font-medium mb-2 text-sm">Actions & Buttons</h5>
              <div class="flex flex-wrap gap-2">
                <BaseIcon name="plus" size="sm" class="text-success" />
                <BaseIcon name="pencil" size="sm" class="text-info" />
                <BaseIcon name="trash" size="sm" class="text-error" />
                <BaseIcon name="check" size="sm" class="text-success" />
                <BaseIcon name="x-mark" size="sm" class="text-error" />
              </div>
            </div>
            <div class="bg-base-100 p-3 rounded">
              <h5 class="font-medium mb-2 text-sm">Status & Feedback</h5>
              <div class="flex flex-wrap gap-2">
                <BaseIcon name="check-circle" size="sm" class="text-success" />
                <BaseIcon name="x-circle" size="sm" class="text-error" />
                <BaseIcon name="exclamation-triangle" size="sm" class="text-warning" />
                <BaseIcon name="information-circle" size="sm" class="text-info" />
              </div>
            </div>
            <div class="bg-base-100 p-3 rounded">
              <h5 class="font-medium mb-2 text-sm">Content & Media</h5>
              <div class="flex flex-wrap gap-2">
                <BaseIcon name="document-text" size="sm" class="text-base-content/60" />
                <BaseIcon name="photo" size="sm" class="text-base-content/60" />
                <BaseIcon name="camera" size="sm" class="text-base-content/60" />
                <BaseIcon name="folder" size="sm" class="text-base-content/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseAccordion Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseAccordion Component</h3>
            <p class="text-sm">Collapsible content panels with icons, badges, and flexible content slots.</p>
          </div>
        </div>

        <!-- Basic Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bars-3-bottom-left" size="sm" />
            Basic Accordion
          </h3>
          <BaseAccordion :items="basicAccordionItems" />
        </div>

        <!-- Multiple Open -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="squares-plus" size="sm" />
            Multiple Open Accordion
          </h3>
          <BaseAccordion :items="multipleAccordionItems" :multiple="true" :defaultOpen="[0]" />
        </div>

        <!-- With Icons and Badges -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="swatch" size="sm" />
            With Icons & Badges
          </h3>
          <BaseAccordion :items="iconAccordionItems" />
        </div>

        <!-- Custom Content Slots -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="puzzle-piece" size="sm" />
            Custom Content Slots
          </h3>
          <BaseAccordion :items="slotAccordionItems">
            <template #content-0>
              <div class="flex items-center gap-4 p-4 bg-success/10 rounded-lg">
                <BaseIcon name="check-circle" size="lg" class="text-success" />
                <div>
                  <h4 class="font-semibold text-success">Success Status</h4>
                  <p class="text-sm">Custom slot content with success styling</p>
                </div>
              </div>
            </template>
            <template #content-1="{ item, index }">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-title">Total Users</div>
                  <div class="stat-value text-primary">1,234</div>
                  <div class="stat-desc">↗︎ 12% increase</div>
                </div>
                <div class="stat bg-base-100 rounded-lg">
                  <div class="stat-title">Revenue</div>
                  <div class="stat-value text-success">$89,400</div>
                  <div class="stat-desc">↗︎ 8% increase</div>
                </div>
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;!-- Basic accordion --&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseAccordion :items="accordionItems" /&gt;</code></pre>
            <pre data-prefix="3"><code></code></pre>
            <pre data-prefix="4"><code>&lt;!-- Multiple open with default --&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseAccordion</code></pre>
            <pre data-prefix="6"><code>  :items="items"</code></pre>
            <pre data-prefix="7"><code>  :multiple="true"</code></pre>
            <pre data-prefix="8"><code>  :defaultOpen="[0, 2]"</code></pre>
            <pre data-prefix="9"><code>  @change="handleChange"</code></pre>
            <pre data-prefix="10"><code>/&gt;</code></pre>
            <pre data-prefix="11"><code></code></pre>
            <pre data-prefix="12"><code>&lt;!-- With custom slots --&gt;</code></pre>
            <pre data-prefix="13"><code>&lt;BaseAccordion :items="items"&gt;</code></pre>
            <pre data-prefix="14"><code>  &lt;template #content-0&gt;</code></pre>
            <pre data-prefix="15"><code>    &lt;div class="custom-content"&gt;...&lt;/div&gt;</code></pre>
            <pre data-prefix="16"><code>  &lt;/template&gt;</code></pre>
            <pre data-prefix="17"><code>&lt;/BaseAccordion&gt;</code></pre>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>items: AccordionItem[]</code> - Array of accordion items (required)</div>
            <div><code>multiple?: boolean</code> - Allow multiple panels open (default: false)</div>
            <div><code>iconSize?: string</code> - Icon size for item icons (default: 'sm')</div>
            <div><code>defaultOpen?: number[]</code> - Initially open panel indices</div>
          </div>
        </div>

        <!-- AccordionItem Interface -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            AccordionItem Interface
          </h3>
          <div class="mockup-code text-xs">
            <pre data-prefix="1"><code>interface AccordionItem {</code></pre>
            <pre data-prefix="2"><code>  title: string           // Panel title</code></pre>
            <pre data-prefix="3"><code>  content?: string        // HTML content</code></pre>
            <pre data-prefix="4"><code>  icon?: string          // Heroicon name</code></pre>
            <pre data-prefix="5"><code>  iconClass?: string     // Icon CSS classes</code></pre>
            <pre data-prefix="6"><code>  badge?: string | number // Badge text/number</code></pre>
            <pre data-prefix="7"><code>  disabled?: boolean     // Disable panel</code></pre>
            <pre data-prefix="8"><code>}</code></pre>
          </div>
        </div>

        <!-- Events Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bolt" size="sm" />
            Events
          </h3>
          <div class="text-xs space-y-1">
            <div><code>@change</code> - Emitted when open panels change (openItems: number[])</div>
            <div><code>@itemToggle</code> - Emitted when single panel toggles (index: number, isOpen: boolean)</div>
          </div>
        </div>

        <!-- Methods Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="cog-6-tooth" size="sm" />
            Exposed Methods
          </h3>
          <div class="text-xs space-y-1">
            <div><code>toggle(index: number)</code> - Toggle specific panel</div>
            <div><code>isOpen(index: number)</code> - Check if panel is open</div>
            <div><code>openAll()</code> - Open all panels (multiple mode only)</div>
            <div><code>closeAll()</code> - Close all panels</div>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseUpload Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseUpload Component</h3>
            <p class="text-sm">Advanced file upload component with drag & drop, progress tracking, and file validation.</p>
          </div>
        </div>

        <!-- Basic Upload -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="cloud-arrow-up" size="sm" />
            Basic File Upload
          </h3>
          <BaseUpload 
            uploadText="Click to select files"
            subtitle="Support for any file type"
            @filesSelected="handleFilesSelected"
          />
        </div>

        <!-- Multiple Files Upload -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-duplicate" size="sm" />
            Multiple Files Upload
          </h3>
          <BaseUpload 
            :multiple="true"
            :maxFiles="5"
            uploadText="Upload multiple files (max 5)"
            subtitle="Drag and drop multiple files here"
            @filesSelected="handleFilesSelected"
          />
        </div>

        <!-- Image Upload Only -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="photo" size="sm" />
            Image Upload Only
          </h3>
          <BaseUpload 
            accept="image/*"
            :maxSize="5 * 1024 * 1024"
            uploadText="Upload images only"
            subtitle="Supports JPG, PNG, GIF up to 5MB"
            @filesSelected="handleFilesSelected"
          />
        </div>

        <!-- Document Upload -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            Document Upload
          </h3>
          <BaseUpload 
            accept=".pdf,.doc,.docx,.txt"
            :multiple="true"
            :maxSize="10 * 1024 * 1024"
            uploadText="Upload documents"
            subtitle="PDF, DOC, DOCX, TXT files up to 10MB"
            @filesSelected="handleFilesSelected"
          />
        </div>

        <!-- Auto Upload Example -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bolt" size="sm" />
            Auto Upload (Simulated)
          </h3>
          <BaseUpload 
            :autoUpload="true"
            uploadUrl="/api/upload"
            uploadText="Files upload automatically"
            subtitle="Upload starts immediately after selection"
            @uploadProgress="handleUploadProgress"
            @uploadComplete="handleUploadComplete"
            @filesSelected="handleFilesSelected"
          />
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;!-- Basic upload --&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseUpload @filesSelected="handleFiles" /&gt;</code></pre>
            <pre data-prefix="3"><code></code></pre>
            <pre data-prefix="4"><code>&lt;!-- Multiple files with validation --&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseUpload</code></pre>
            <pre data-prefix="6"><code>  :multiple="true"</code></pre>
            <pre data-prefix="7"><code>  accept="image/*"</code></pre>
            <pre data-prefix="8"><code>  :maxSize="5 * 1024 * 1024"</code></pre>
            <pre data-prefix="9"><code>  :maxFiles="10"</code></pre>
            <pre data-prefix="10"><code>  @filesSelected="handleFiles"</code></pre>
            <pre data-prefix="11"><code>/&gt;</code></pre>
            <pre data-prefix="12"><code></code></pre>
            <pre data-prefix="13"><code>&lt;!-- Auto upload with progress --&gt;</code></pre>
            <pre data-prefix="14"><code>&lt;BaseUpload</code></pre>
            <pre data-prefix="15"><code>  :autoUpload="true"</code></pre>
            <pre data-prefix="16"><code>  uploadUrl="/api/upload"</code></pre>
            <pre data-prefix="17"><code>  :uploadHeaders="{ 'Authorization': 'Bearer token' }"</code></pre>
            <pre data-prefix="18"><code>  @uploadComplete="handleComplete"</code></pre>
            <pre data-prefix="19"><code>/&gt;</code></pre>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>accept?: string</code> - Accepted file types (default: '*/*')</div>
            <div><code>multiple?: boolean</code> - Allow multiple files (default: false)</div>
            <div><code>maxSize?: number</code> - Max file size in bytes (default: 10MB)</div>
            <div><code>maxFiles?: number</code> - Maximum number of files (default: 10)</div>
            <div><code>disabled?: boolean</code> - Disable upload (default: false)</div>
            <div><code>uploadText?: string</code> - Upload area text</div>
            <div><code>dropText?: string</code> - Drag over text</div>
            <div><code>subtitle?: string</code> - Subtitle text</div>
            <div><code>buttonText?: string</code> - Upload button text</div>
            <div><code>showFileList?: boolean</code> - Show selected files (default: true)</div>
            <div><code>autoUpload?: boolean</code> - Auto upload on select (default: false)</div>
            <div><code>uploadUrl?: string</code> - Upload endpoint URL</div>
            <div><code>uploadHeaders?: object</code> - Upload request headers</div>
          </div>
        </div>

        <!-- Events Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bolt" size="sm" />
            Events
          </h3>
          <div class="text-xs space-y-1">
            <div><code>@filesSelected</code> - Emitted when files are selected (files: File[])</div>
            <div><code>@fileAdded</code> - Emitted when single file added (file: File, index: number)</div>
            <div><code>@fileRemoved</code> - Emitted when file removed (file: File, index: number)</div>
            <div><code>@uploadProgress</code> - Upload progress (progress: number, file: File, index: number)</div>
            <div><code>@uploadComplete</code> - Upload finished (file: File, index: number, response: any)</div>
            <div><code>@uploadError</code> - Upload error (error: string, file: File, index: number)</div>
            <div><code>@error</code> - Validation errors (errors: string[])</div>
          </div>
        </div>

        <!-- Methods Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="cog-6-tooth" size="sm" />
            Exposed Methods
          </h3>
          <div class="text-xs space-y-1">
            <div><code>uploadAll()</code> - Upload all selected files manually</div>
            <div><code>clearFiles()</code> - Clear all selected files and reset</div>
            <div><code>getFiles()</code> - Get array of currently selected files</div>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="star" size="sm" />
            Key Features
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Upload Features</h5>
              <ul class="text-xs space-y-1">
                <li>✅ Drag & drop support</li>
                <li>✅ Click to select files</li>
                <li>✅ Multiple file selection</li>
                <li>✅ Auto upload option</li>
                <li>✅ Upload progress tracking</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Validation & UI</h5>
              <ul class="text-xs space-y-1">
                <li>✅ File type validation</li>
                <li>✅ File size validation</li>
                <li>✅ File count limits</li>
                <li>✅ Error handling & display</li>
                <li>✅ File preview with icons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseInput with Mask Options -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseInput with Mask Options</h3>
            <p class="text-sm">Input masking for formatted data entry like phone numbers, dates, and custom patterns.</p>
          </div>
        </div>

        <!-- Phone Number Mask -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="phone" size="sm" />
            Phone Number Masks
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput 
              label="US Phone Number"
              mask="(###) ###-####"
              placeholder="(123) 456-7890"
              hint="US format: (123) 456-7890"
            />
            <BaseInput 
              label="International Phone"
              mask="+## (###) ###-####"
              placeholder="+66 (12) 345-6789"
              hint="International format"
            />
          </div>
        </div>

        <!-- Date Masks -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="calendar-days" size="sm" />
            Date & Time Masks
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseInput 
              label="Date (DD/MM/YYYY)"
              mask="##/##/####"
              placeholder="25/12/2024"
              hint="Day/Month/Year"
            />
            <BaseInput 
              label="Date (MM-DD-YYYY)"
              mask="##-##-####"
              placeholder="12-25-2024"
              hint="Month-Day-Year"
            />
            <BaseInput 
              label="Time (HH:MM)"
              mask="##:##"
              placeholder="14:30"
              hint="24-hour format"
            />
          </div>
        </div>

        <!-- Credit Card Masks -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="credit-card" size="sm" />
            Credit Card & Financial
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput 
              label="Credit Card Number"
              mask="#### #### #### ####"
              placeholder="1234 5678 9012 3456"
              hint="16-digit card number"
            />
            <BaseInput 
              label="CVV Code"
              mask="###"
              placeholder="123"
              hint="3-digit security code"
              maxlength="3"
            />
            <BaseInput 
              label="Expiry Date"
              mask="##/##"
              placeholder="12/28"
              hint="MM/YY format"
            />
            <BaseInput 
              label="Currency Amount"
              mask="###,###.##"
              placeholder="1,234.56"
              hint="With thousands separator"
            />
          </div>
        </div>

        <!-- ID & Code Masks -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="identification" size="sm" />
            ID Numbers & Codes
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput 
              label="Thai ID Number"
              mask="#-####-#####-##-#"
              placeholder="1-2345-67890-12-3"
              hint="Thai national ID format"
            />
            <BaseInput 
              label="ZIP Code"
              mask="#####"
              placeholder="12345"
              hint="5-digit ZIP code"
            />
            <BaseInput 
              label="License Plate"
              mask="AAA-####"
              placeholder="ABC-1234"
              hint="3 letters + 4 numbers"
            />
            <BaseInput 
              label="Product Code"
              mask="AA##-####"
              placeholder="AB12-3456"
              hint="Custom product format"
            />
          </div>
        </div>

        <!-- Custom Patterns -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="puzzle-piece" size="sm" />
            Custom Patterns
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput 
              label="IP Address"
              mask="###.###.###.###"
              placeholder="192.168.001.001"
              hint="IPv4 address format"
            />
            <BaseInput 
              label="MAC Address"
              mask="##:##:##:##:##:##"
              placeholder="00:1B:44:11:3A:B7"
              hint="MAC address format"
            />
            <BaseInput 
              label="Serial Number"
              mask="AA####-BB####"
              placeholder="AB1234-CD5678"
              hint="Custom serial format"
            />
            <BaseInput 
              label="Version Number"
              mask="#.#.##"
              placeholder="1.2.34"
              hint="Software version"
            />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;!-- Simple phone mask --&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseInput mask="(###) ###-####" /&gt;</code></pre>
            <pre data-prefix="3"><code></code></pre>
            <pre data-prefix="4"><code>&lt;!-- Date mask --&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseInput mask="##/##/####" placeholder="DD/MM/YYYY" /&gt;</code></pre>
            <pre data-prefix="6"><code></code></pre>
            <pre data-prefix="7"><code>&lt;!-- Credit card mask --&gt;</code></pre>
            <pre data-prefix="8"><code>&lt;BaseInput</code></pre>
            <pre data-prefix="9"><code>  mask="#### #### #### ####"</code></pre>
            <pre data-prefix="10"><code>  placeholder="1234 5678 9012 3456"</code></pre>
            <pre data-prefix="11"><code>/&gt;</code></pre>
            <pre data-prefix="12"><code></code></pre>
            <pre data-prefix="13"><code>&lt;!-- Custom pattern with options --&gt;</code></pre>
            <pre data-prefix="14"><code>&lt;BaseInput</code></pre>
            <pre data-prefix="15"><code>  mask="AA##-####"</code></pre>
            <pre data-prefix="16"><code>  :maskOptions="{ placeholderChar: '_' }"</code></pre>
            <pre data-prefix="17"><code>/&gt;</code></pre>
          </div>
        </div>

        <!-- Mask Patterns Reference -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            Mask Pattern Reference
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Basic Tokens</h5>
              <div class="text-xs space-y-1">
                <div><code>#</code> - Any digit (0-9)</div>
                <div><code>A</code> - Any letter (a-z, A-Z)</div>
                <div><code>N</code> - Any alphanumeric (a-z, A-Z, 0-9)</div>
                <div><code>X</code> - Any character</div>
              </div>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Special Characters</h5>
              <div class="text-xs space-y-1">
                <div><code>-</code> <code>/</code> <code>:</code> <code>.</code> - Literal characters</div>
                <div><code>()</code> <code>[]</code> - Grouping characters</div>
                <div><code>\\</code> - Escape character</div>
                <div>Any other character is treated as literal</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Mask Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>mask?: string | Array</code> - Mask pattern or array of patterns</div>
            <div><code>maskOptions?: MaskOptions</code> - Additional mask configuration</div>
            <div class="ml-4">
              <div><code>tokens?: Record&lt;string, any&gt;</code> - Custom token definitions</div>
              <div><code>masked?: boolean</code> - Return masked or raw value</div>
              <div><code>placeholderChar?: string</code> - Character for empty positions</div>
            </div>
          </div>
        </div>

        <!-- MaskOptions Advanced Usage -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="cog-6-tooth" size="sm" />
            Advanced MaskOptions Usage
          </h3>
          
          <!-- Custom Placeholder Character -->
          <div class="mb-6">
            <h4 class="font-medium text-sm mb-3">Custom Placeholder Character</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput 
                label="Default Placeholder"
                mask="####-##-##"
                placeholder="YYYY-MM-DD"
                hint="Default space character"
              />
              <BaseInput 
                label="Custom Placeholder"
                mask="####-##-##"
                :maskOptions="{ placeholderChar: '_' }"
                placeholder="YYYY-MM-DD"
                hint="Using underscore (_)"
              />
            </div>
            <div class="mockup-code text-xs mt-3">
              <pre data-prefix="1"><code>:maskOptions="{ placeholderChar: '_' }"</code></pre>
            </div>
          </div>

          <!-- Masked vs Raw Value -->
          <div class="mb-6">
            <h4 class="font-medium text-sm mb-3">Masked vs Raw Value Output</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput 
                label="Masked Value (Default)"
                mask="(###) ###-####"
                placeholder="(123) 456-7890"
                hint="Returns: (123) 456-7890"
              />
              <BaseInput 
                label="Raw Value Only"
                mask="(###) ###-####"
                :maskOptions="{ masked: false }"
                placeholder="(123) 456-7890"
                hint="Returns: 1234567890"
              />
            </div>
            <div class="mockup-code text-xs mt-3">
              <pre data-prefix="1"><code>// Masked value (default)</code></pre>
              <pre data-prefix="2"><code>:maskOptions="{ masked: true }"  // รูปแบบ: (123) 456-7890</code></pre>
              <pre data-prefix="3"><code></code></pre>
              <pre data-prefix="4"><code>// Raw value only</code></pre>
              <pre data-prefix="5"><code>:maskOptions="{ masked: false }" // เฉพาะตัวเลข: 1234567890</code></pre>
            </div>
          </div>

          <!-- Custom Tokens -->
          <div class="mb-6">
            <h4 class="font-medium text-sm mb-3">Custom Token Definitions</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput 
                label="Thai Characters Only"
                mask="AAA-####"
                :maskOptions="thaiTokenOptions"
                placeholder="กขค-1234"
                hint="Custom Thai token"
              />
              <BaseInput 
                label="Hex Color Code"
                mask="#HHHHHH"
                :maskOptions="hexTokenOptions"
                placeholder="#FF5733"
                hint="Hexadecimal only"
              />
            </div>
            <div class="mockup-code text-xs mt-3">
              <pre data-prefix="1"><code>// กำหนด token สำหรับอักษรไทย</code></pre>
              <pre data-prefix="2"><code>const thaiTokenOptions = {</code></pre>
              <pre data-prefix="3"><code>  tokens: {</code></pre>
              <pre data-prefix="4"><code>    'T': { pattern: /[ก-๙]/ } // อักษรไทยเท่านั้น</code></pre>
              <pre data-prefix="5"><code>  }</code></pre>
              <pre data-prefix="6"><code>}</code></pre>
              <pre data-prefix="7"><code></code></pre>
              <pre data-prefix="8"><code>// กำหนด token สำหรับ Hex color</code></pre>
              <pre data-prefix="9"><code>const hexTokenOptions = {</code></pre>
              <pre data-prefix="10"><code>  tokens: {</code></pre>
              <pre data-prefix="11"><code>    'H': { pattern: /[0-9A-Fa-f]/ } // Hex เท่านั้น</code></pre>
              <pre data-prefix="12"><code>  }</code></pre>
              <pre data-prefix="13"><code>}</code></pre>
            </div>
          </div>

          <!-- Multiple Mask Patterns -->
          <div class="mb-6">
            <h4 class="font-medium text-sm mb-3">Multiple Mask Patterns (Dynamic)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput 
                label="Phone Number (Auto-detect)"
                :mask="multipleMasks"
                placeholder="123-456-7890 or (123) 456-7890"
                hint="Supports multiple formats"
              />
              <BaseInput 
                label="Credit Card (Auto-detect)"
                :mask="creditCardMasks"
                placeholder="1234 5678 9012 3456"
                hint="Visa, MasterCard, Amex"
              />
            </div>
            <div class="mockup-code text-xs mt-3">
              <pre data-prefix="1"><code>// หลายรูปแบบสำหรับเบอร์โทร</code></pre>
              <pre data-prefix="2"><code>const multipleMasks = [</code></pre>
              <pre data-prefix="3"><code>  '###-###-####',      // 123-456-7890</code></pre>
              <pre data-prefix="4"><code>  '(###) ###-####',    // (123) 456-7890</code></pre>
              <pre data-prefix="5"><code>  '### ### ####'       // 123 456 7890</code></pre>
              <pre data-prefix="6"><code>]</code></pre>
              <pre data-prefix="7"><code></code></pre>
              <pre data-prefix="8"><code>// หลายรูปแบบสำหรับบัตรเครดิต</code></pre>
              <pre data-prefix="9"><code>const creditCardMasks = [</code></pre>
              <pre data-prefix="10"><code>  '#### #### #### ####',   // Visa/MC (16 digits)</code></pre>
              <pre data-prefix="11"><code>  '#### ###### #####',     // Amex (15 digits)</code></pre>
              <pre data-prefix="12"><code>  '#### #### ####'         // Diners (14 digits)</code></pre>
              <pre data-prefix="13"><code>]</code></pre>
            </div>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="briefcase" size="sm" />
            Real-world Examples
          </h3>
          
          <div class="space-y-4">
            <!-- Thai ID Card -->
            <div class="bg-base-100 p-4 rounded-lg">
              <h5 class="font-medium text-sm mb-2">เลขประจำตัวประชาชน (Thai National ID)</h5>
              <BaseInput 
                label="เลขประจำตัวประชาชน"
                mask="#-####-#####-##-#"
                :maskOptions="{ placeholderChar: '_' }"
                placeholder="1-2345-67890-12-3"
                hint="รูปแบบ: X-XXXX-XXXXX-XX-X"
              />
              <div class="mockup-code text-xs mt-2">
                <pre data-prefix="1"><code>mask="#-####-#####-##-#"</code></pre>
                <pre data-prefix="2"><code>:maskOptions="{ placeholderChar: '_' }"</code></pre>
              </div>
            </div>

            <!-- Thai Mobile -->
            <div class="bg-base-100 p-4 rounded-lg">
              <h5 class="font-medium text-sm mb-2">หมายเลขโทรศัพท์มือถือไทย</h5>
              <BaseInput 
                label="เบอร์มือถือ"
                :mask="thaiMobileMasks"
                placeholder="08-1234-5678"
                hint="รองรับ 08, 09, 06 รูปแบบต่างๆ"
              />
              <div class="mockup-code text-xs mt-2">
                <pre data-prefix="1"><code>const thaiMobileMasks = [</code></pre>
                <pre data-prefix="2"><code>  '##-####-####',    // 08-1234-5678</code></pre>
                <pre data-prefix="3"><code>  '### ### ####',    // 081 234 5678</code></pre>
                <pre data-prefix="4"><code>  '##########'       // 0812345678</code></pre>
                <pre data-prefix="5"><code>]</code></pre>
              </div>
            </div>

            <!-- Bank Account -->
            <div class="bg-base-100 p-4 rounded-lg">
              <h5 class="font-medium text-sm mb-2">หมายเลขบัญชีธนาคาร</h5>
              <BaseInput 
                label="เลขที่บัญชี"
                mask="###-#-#####-#"
                :maskOptions="{ placeholderChar: 'X', masked: false }"
                placeholder="123-4-56789-0"
                hint="รูปแบบธนาคารไทย (raw value only)"
              />
              <div class="mockup-code text-xs mt-2">
                <pre data-prefix="1"><code>mask="###-#-#####-#"</code></pre>
                <pre data-prefix="2"><code>:maskOptions="{</code></pre>
                <pre data-prefix="3"><code>  placeholderChar: 'X',</code></pre>
                <pre data-prefix="4"><code>  masked: false  // ส่งค่าเฉพาะตัวเลข</code></pre>
                <pre data-prefix="5"><code>}"</code></pre>
              </div>
            </div>

            <!-- License Plate -->
            <div class="bg-base-100 p-4 rounded-lg">
              <h5 class="font-medium text-sm mb-2">ทะเบียนรถยนต์ไทย</h5>
              <BaseInput 
                label="ทะเบียนรถ"
                :mask="licensePlateMasks"
                placeholder="กข-1234 หรือ 1กข-2345"
                hint="รองรับทะเบียนเก่าและใหม่"
              />
              <div class="mockup-code text-xs mt-2">
                <pre data-prefix="1"><code>const licensePlateMasks = [</code></pre>
                <pre data-prefix="2"><code>  'AA-####',      // กข-1234 (ทะเบียนเก่า)</code></pre>
                <pre data-prefix="3"><code>  '#AA-####',     // 1กข-2345 (ทะเบียนใหม่)</code></pre>
                <pre data-prefix="4"><code>  'AAA-###'       // กขค-123 (รถจักรยานยนต์)</code></pre>
                <pre data-prefix="5"><code>]</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Patterns -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="star" size="sm" />
            Common Mask Patterns
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Phone & Contact</h5>
              <div class="text-xs space-y-1 font-mono">
                <div>(###) ###-#### - US Phone</div>
                <div>+## ### ### #### - International</div>
                <div>##-####-#### - Thai Mobile</div>
                <div>###-###-#### - Alternative</div>
              </div>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-sm">Date & Time</h5>
              <div class="text-xs space-y-1 font-mono">
                <div>##/##/#### - DD/MM/YYYY</div>
                <div>####-##-## - YYYY-MM-DD</div>
                <div>##:##:## - HH:MM:SS</div>
                <div>## AAA #### - 25 DEC 2024</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Practices -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="light-bulb" size="sm" />
            Best Practices & Tips
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <h5 class="font-medium text-sm">การใช้งานที่ดี</h5>
              <ul class="text-xs space-y-1">
                <li>✅ ใช้ placeholder เพื่อแสดงรูปแบบที่ต้องการ</li>
                <li>✅ ใส่ hint เพื่ออธิบายรูปแบบ</li>
                <li>✅ ใช้ masked: false เมื่อต้องการเก็บข้อมูลดิบ</li>
                <li>✅ ทดสอบ mask กับข้อมูลจริง</li>
                <li>✅ พิจารณาใช้หลาย pattern สำหรับความยืดหยุ่น</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h5 class="font-medium text-sm">ข้อควรระวัง</h5>
              <ul class="text-xs space-y-1">
                <li>⚠️ อย่าใช้ mask ซับซ้อนเกินไป</li>
                <li>⚠️ ทดสอบการ copy-paste</li>
                <li>⚠️ พิจารณา UX ในการแก้ไขข้อมูล</li>
                <li>⚠️ ระวังการส่งข้อมูลไปยัง API</li>
                <li>⚠️ ตรวจสอบ validation หลัง mask</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseButton Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseButton Component</h3>
            <p class="text-sm">Flexible button component with loading states, icons, and comprehensive DaisyUI styling options.</p>
          </div>
        </div>

        <!-- Button Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="cursor-arrow-ripple" size="sm" />
            Button Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium mb-3">Basic Variants:</p>
              <div class="flex flex-wrap gap-2">
                <BaseButton label="Default Button" />
                <BaseButton label="Primary Button" variant="primary" />
                <BaseButton label="Success Button" variant="success" />
                <BaseButton label="Warning Button" variant="warning" />
              </div>
            </div>
            <div>
              <p class="text-sm font-medium mb-3">With Icons & States:</p>
              <div class="flex flex-wrap gap-2">
                <BaseButton label="Save" variant="primary" icon-left="check" />
                <BaseButton label="Delete" variant="error" icon-left="trash" />
                <BaseButton label="Loading..." variant="primary" :loading="true" />
                <BaseButton label="Disabled" :disabled="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseButton label="Click Me" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseButton variant="primary" icon-left="save" /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseButton :loading="isLoading" loadingText="Saving..." /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    


    <!-- BaseAlert Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseAlert Component</h3>
            <p class="text-sm">Alert notification system with success, error, warning, info, and confirm dialog support.</p>
          </div>
        </div>

        <!-- Alert Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="bell" size="sm" />
            Alert Examples
          </h3>
          <div class="flex flex-wrap gap-2">
            <BaseButton label="Show Success" variant="success" size="sm" @click="alertDemo.showSuccess = true" />
            <BaseButton label="Show Error" variant="error" size="sm" @click="alertDemo.showError = true" />
            <BaseButton label="Show Warning" variant="warning" size="sm" @click="alertDemo.showWarning = true" />
            <BaseButton label="Show Confirm" variant="info" size="sm" @click="alertDemo.showConfirm = true" />
          </div>
          <div v-if="alertDemo.confirmResult" class="mt-3 text-sm">
            ผลลัพธ์: {{ alertDemo.confirmResult }}
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseAlert</code></pre>
            <pre data-prefix="2"><code>  v-model:visible="showAlert"</code></pre>
            <pre data-prefix="3"><code>  type="success"</code></pre>
            <pre data-prefix="4"><code>  title="สำเร็จ!"</code></pre>
            <pre data-prefix="5"><code>  message="บันทึกข้อมูลเรียบร้อยแล้ว"</code></pre>
            <pre data-prefix="6"><code>/&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseAvatar Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseAvatar Component</h3>
            <p class="text-sm">Flexible avatar component with image support, initials display, badges, online status, and customizable appearance.</p>
          </div>
        </div>

        <!-- Avatar Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="user-circle" size="sm" />
            Avatar Examples
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <!-- Size Examples -->
            <div class="space-y-3">
              <p class="text-xs font-medium">Sizes:</p>
              <div class="flex items-end gap-2">
                <BaseAvatar name="John Doe" size="xs" />
                <BaseAvatar name="Jane Smith" size="sm" />
                <BaseAvatar name="Bob Wilson" size="md" />
                <BaseAvatar name="Alice Brown" size="lg" />
              </div>
            </div>

            <!-- Shape Examples -->
            <div class="space-y-3">
              <p class="text-xs font-medium">Shapes:</p>
              <div class="flex items-center gap-2">
                <BaseAvatar name="Circle User" shape="circle" />
                <BaseAvatar name="Square User" shape="square" />
              </div>
            </div>

            <!-- Status Examples -->
            <div class="space-y-3">
              <p class="text-xs font-medium">Status:</p>
              <div class="flex items-center gap-2">
                <BaseAvatar name="Online User" :show-online="true" />
                <BaseAvatar name="Offline User" :show-offline="true" />
              </div>
            </div>

            <!-- Badge Examples -->
            <div class="space-y-3">
              <p class="text-xs font-medium">With Badges:</p>
              <div class="flex items-center gap-2">
                <BaseAvatar name="Admin User" badge="A" />
                <BaseAvatar name="VIP User" :badge="{ icon: 'star', variant: 'warning' }" />
              </div>
            </div>
          </div>
        </div>

        <!-- Props Documentation -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="adjustments-horizontal" size="sm" />
            Props
          </h3>
          <div class="text-xs space-y-1">
            <div><code>src?: string</code> - Image URL for avatar</div>
            <div><code>name?: string</code> - Display name (for initials)</div>
            <div><code>size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code> - Avatar size</div>
            <div><code>shape?: 'circle' | 'square'</code> - Avatar shape</div>
            <div><code>showOnline?: boolean</code> - Show online indicator</div>
            <div><code>showOffline?: boolean</code> - Show offline indicator</div>
            <div><code>badge?: string | number | Badge</code> - Badge display</div>
            <div><code>clickable?: boolean</code> - Enable click interaction</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props for demo data from parent
const props = defineProps({
  alertDemo: { type: Object, required: true }
})

// Accordion demo data
const basicAccordionItems = [
  {
    title: 'Getting Started',
    content: '<p>Welcome to our comprehensive guide. This section covers the basic setup and initial configuration steps.</p>'
  },
  {
    title: 'Configuration',
    content: '<p>Learn how to configure your application settings, environment variables, and customize the behavior.</p>'
  },
  {
    title: 'Advanced Usage',
    content: '<p>Discover advanced features, best practices, and optimization techniques for power users.</p>'
  }
]

const multipleAccordionItems = [
  {
    title: 'Project Overview',
    content: '<p>This project aims to create a modern, scalable web application using Vue 3 and Nuxt.</p>'
  },
  {
    title: 'Technical Stack',
    content: '<p>Built with Vue 3, Nuxt 3, TypeScript, Tailwind CSS, and DaisyUI components.</p>'
  },
  {
    title: 'Development Process',
    content: '<p>Following agile methodologies with continuous integration and deployment practices.</p>'
  }
]

const iconAccordionItems = [
  {
    title: 'User Management',
    icon: 'users',
    iconClass: 'text-primary',
    badge: 'Active',
    content: '<p>Manage user accounts, permissions, and access controls for your application.</p>'
  },
  {
    title: 'Analytics Dashboard',
    icon: 'chart-bar',
    iconClass: 'text-success',
    badge: 12,
    content: '<p>View comprehensive analytics, reports, and insights about your application usage.</p>'
  },
  {
    title: 'Settings & Configuration',
    icon: 'cog-6-tooth',
    iconClass: 'text-warning',
    content: '<p>Configure application settings, preferences, and system-wide options.</p>'
  },
  {
    title: 'Support & Help',
    icon: 'question-mark-circle',
    iconClass: 'text-info',
    badge: 'New',
    content: '<p>Access documentation, tutorials, and get help with common issues.</p>'
  }
]

const slotAccordionItems = [
  {
    title: 'System Status',
    icon: 'check-circle',
    iconClass: 'text-success'
  },
  {
    title: 'Performance Metrics',
    icon: 'chart-line',
    iconClass: 'text-primary'
  }
]

// Upload event handlers
const handleFilesSelected = (files) => {
  console.log('Files selected:', files)
}

const handleUploadProgress = (progress, file, index) => {
  console.log(`Upload progress: ${progress}% for ${file.name}`)
}

const handleUploadComplete = (file, index, response) => {
  console.log(`Upload complete for ${file.name}`, response)
}

// Mask demo data
const thaiTokenOptions = {
  tokens: {
    'T': { pattern: /[ก-๙]/ } // Thai characters only
  }
}

const hexTokenOptions = {
  tokens: {
    'H': { pattern: /[0-9A-Fa-f]/ } // Hexadecimal only
  }
}

const multipleMasks = [
  '###-###-####',      // 123-456-7890
  '(###) ###-####',    // (123) 456-7890
  '### ### ####'       // 123 456 7890
]

const creditCardMasks = [
  '#### #### #### ####',   // Visa/MC (16 digits)
  '#### ###### #####',     // Amex (15 digits)
  '#### #### ####'         // Diners (14 digits)
]

const thaiMobileMasks = [
  '##-####-####',    // 08-1234-5678
  '### ### ####',    // 081 234 5678
  '##########'       // 0812345678
]

const licensePlateMasks = [
  'AA-####',      // กข-1234 (ทะเบียนเก่า)
  '#AA-####',     // 1กข-2345 (ทะเบียนใหม่)
  'AAA-###'       // กขค-123 (รถจักรยานยนต์)
]

</script>