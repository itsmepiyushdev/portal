<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputText from "primevue/inputtext";
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import Button from "primevue/button";

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
});

const updatePassword = () => {
    form.put(route("password.update"), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset("password", "password_confirmation");
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset("current_password");
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Update Password</div>
                    <p class="mt-1 text-sm">
                        Ensure your account is using a long, random password to stay
                        secure.
                    </p>
                    <form
                        @submit.prevent="updatePassword"
                        class="mt-6 space-y-6"
                    >
                        <div class="flex flex-col gap-2">
                            <label for="current_password"
                                >Current Password</label
                            >

                            <InputText
                                id="current_password"
                                ref="currentPasswordInput"
                                v-model="form.current_password"
                                type="password"
                                class="mt-1 block w-full"
                                autocomplete="current-password"
                            />
                            <InputError
                                :message="form.errors.current_password"
                                class="mt-2"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password">New Password</label>
                            <InputText
                                id="password"
                                ref="passwordInput"
                                v-model="form.password"
                                type="password"
                                class="mt-1 block w-full"
                                autocomplete="new-password"
                            />

                            <InputError
                                :message="form.errors.password"
                                class="mt-2"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="password_confirmation"
                                >Confirm Password</label
                            >
                            <InputText
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                type="password"
                                class="mt-1 block w-full"
                                autocomplete="new-password"
                            />

                            <InputError
                                :message="form.errors.password_confirmation"
                                class="mt-2"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <Button label="Submit"  type="submit" :fluid="false" :disabled="form.processing">Save</Button>
                            <Transition
                                enter-active-class="transition ease-in-out"
                                enter-from-class="opacity-0"
                                leave-active-class="transition ease-in-out"
                                leave-to-class="opacity-0"
                            >
                                <p
                                    v-if="form.recentlySuccessful"
                                    class="text-sm text-gray-600"
                                >
                                    Saved.
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
        </div>
    </Fluid>
</template>
