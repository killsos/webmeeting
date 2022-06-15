<template>
    <div
        class="v3-body"
        :style="{
            height: `${props.height}px`,
            width: `${props.width}px`,
            background: props.bgcolor,
        }"
    >
        <div :class="platform" class="v3-body-inner">
            <template v-if="Object.keys(emojis).length">
                <div class="v3-group">
                    <div class="v3-emojis">
                        <button
                            v-for="emoji in emojis"
                            :key="emoji.u"
                            type="button"
                            @click="handleClick(emoji)"
                        >
                            <img
                                :src="EMOJI_REMOTE_SRC + `/${emoji.u}.png`"
                                :alt="emoji.n[0]"
                                @error="handleError($event, emoji.u)"
                            />
                        </button>
                    </div>
                </div>
            </template>
            <span v-else class="v3-no-result"> No emoji has been found! </span>
        </div>
    </div>
</template>
<script setup lang="ts" name="Emotion">
    import { defineEmits, defineProps } from 'vue'
    import { unicodeToEmoji, isMac } from '@/utils/helpers'
    import emoji from './emojis.json'

    export interface Emoji {
        n: string[]
        u: string
        v?: string[]
        src?: string
        i?: string
    }

    const props = defineProps<{
        height: number
        width: number
        bgcolor: string
    }>()

    const emit = defineEmits<(e: 'select', content: Emoji) => void>()
    const emojis = emoji.data

    const platform = isMac() ? 'is-mac' : ''
    const EMOJI_REMOTE_SRC =
        'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64'

    const handleClick = (emoji: Emoji) => {
        emit('select', {
            ...emoji,
            i: unicodeToEmoji(emoji.u),
        })
    }

    const handleError = (event: Event, unicode: string) => {
        const button = (event?.target as HTMLImageElement)?.closest('button')
        if (button) {
            button.innerHTML = unicodeToEmoji(unicode)
        }
    }
</script>

<style lang="scss" scoped>
    .v3-body {
        padding: 0 0 15px 11px;
        min-height: 0;
        flex-grow: 1;
        .v3-body-inner {
            flex-grow: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
            padding-right: 11px;

            .v3-group {
                h5 {
                    margin: 0;
                    top: 0;
                    background: white;
                    padding: 7px 0 3px 4px;
                    &.v3-sticky {
                        position: sticky;
                    }
                }

                .v3-emojis {
                    display: flex;
                    font-size: 18px;
                    flex-wrap: wrap;
                    button {
                        cursor: pointer;
                        border: none;
                        background: none;
                        margin: 0;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-basis: 12.5%;
                        max-width: 12.5%;
                        flex-grow: 1;
                        padding: 0;
                        font-size: 22px;
                        span {
                            display: inline-block;
                            padding-left: 1px;
                        }
                        &:hover {
                            background: #f7f7f7;
                        }
                        img {
                            max-width: 100%;
                            padding: 4px;
                        }
                    }
                }
            }

            &.is-mac .v3-emojis button {
                font-family: 'Apple Color Emoji';
            }
        }
    }
</style>
