<script lang="ts" setup>
const store = useStore()

const { data: todos } = await store.todos.queryMany(() => ({
    include: {
        posts: true,
    },
}))
const { data: books } = await store.books.queryMany()

const createTodo = store.todos.createForm()
const createTodoInput = useTemplateRef('todoInput')
createTodo.$onSaved(() => {
    createTodoInput.value?.
        createTodoInput.value?.inputRef?.focus()
    createTodoInput.value?.inputRef?.select()
})

const createBook = store.books.createForm()
const createBookInput = useTemplateRef('bookInput')
createBook.$onSaved(() => {
    createBookInput.value?.inputRef?.focus()
    createBookInput.value?.inputRef?.select()
})
</script>

<template>
    <UApp>
        <div class="m-4 p-4 border border-default rounded-xl flex flex-col gap-px">

            <UForm :state="createBook" :schema="createBook.$schema" class="mb-4" @submit="createBook.$save()">
                <UButtonGroup class="w-full">


                    <UInput ref="bookInput" v-model="createBook.title" placeholder="What Is the name of you Book?"
                        autofocus size="xl" class="w-full" @keydown.enter.prevent="createBook.$save()" />

                    <UButton type="submit" icon="lucide:plus" label="Add" size="xl" :loading="createBook.$loading" />
                </UButtonGroup>
            </UForm>

            <BookItem v-for="{ id } in books" :id :key="id" />


            <UForm :state="createTodo" :schema="createTodo.$schema" class="mb-4" @submit="createTodo.$save()">
                <UButtonGroup class="w-full">
                    <UInput ref="input" v-model="createTodo.title" placeholder="What needs to be done?" autofocus
                        size="xl" class="w-full" @keydown.enter.prevent="createTodo.$save()" />

                    <UButton type="submit" icon="lucide:plus" label="Add" size="xl" :loading="createTodo.$loading" />
                </UButtonGroup>
            </UForm>

            <TodoItem v-for="{ id } in todos" :id :key="id" />

            <div v-if="!todos.length" class="text-center text-gray-500 p-12">
                Nothing here yet
            </div>
        </div>
    </UApp>
</template>
