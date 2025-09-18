<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-primary">แผนที่ครัวเรือน</h1>
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 p-4 border rounded-lg">
        <div class="grid col-span-8">
            <BaseAutocomplete 
                :label="'ค้นหาตำแหน่ง'" 
                :options="[
                    {
                        label: 'Option 1',
                        value: 'opt1',
                        id: 1,
                    },
                    {
                        label: 'Option 2',
                        value: 'opt2',
                        id: 2,
                    },
                    {
                        label: 'Option 3',
                        value: 'opt3',
                        id: 3,
                    },
                ]" 
                placeholder='ค้นหาครัวเรือนหรือพิกัด' />
            </div>
        <div class="grid col-span-2">
            <BaseSelect :label="'กรองตามพื้นที่'" 
                :options="[
                    {
                        label: 'Option 1',
                        value: 'opt1',
                    },
                    {
                        label: 'Option 2',
                        value: 'opt2',
                    },
                    {
                        label: 'Option 3',
                        value: 'opt3',
                    } 
                ]" 
            >
            </BaseSelect>
        </div>
        <div class="grid col-span-2">
            <BaseSelect :label="'สถานะ'" 
                :options="[
                    {
                        label: 'Option 1',
                        value: 'opt1',
                    },
                    {
                        label: 'Option 2',
                        value: 'opt2',
                    },
                    {
                        label: 'Option 3',
                        value: 'opt3',
                    } 
                ]" 
            >
            </BaseSelect>
        </div>
    </div>

    <div class="mt-4 p-4 border rounded-md">
        <iframe src="https://www.google.com/maps/d/embed?mid=1lNjX6mG5V1MgXOcA2k0c4Y5ZyJ4&ehbc=2E" width="100%" height="480"></iframe>
    </div>

    <div>
        
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>