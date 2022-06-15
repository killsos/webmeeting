<template>
    <div class="v3-input-emoji-picker">
        <div class="v3-input-picker-root">
            <div class="v3-input-picker-wrap">
                <button
                    ref="button"
                    v-on-click-outside="closeEmoji"
                    type="button"
                    class="v3-input-picker-icon"
                    @click="open = !open"
                >
                    <img :src="face" alt="" />
                </button>

                <div v-show="open" class="v3-emoji-picker">
                    <Emotion :height="300" :width="250" bgcolor="#ccc" @select="onSelect" />
                </div>
            </div>
            <div class="v3-emoji-picker-area">
                <textarea
                    :value="input"
                    class="v3-emoji-picker-textarea"
                    cols="30"
                    rows="4"
                    maxlength="100"
                    placeholder="Say something…"
                    @input="onChangeText"
                />
                <el-button
                    class="v3-emoji-picker-send"
                    :disabled="input.length === 0"
                    @click="sendMessage"
                    >Send
                </el-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="send">
    import { defineEmits, defineProps, ref } from 'vue'
    import Emotion, { Emoji } from '../Emotion/index.vue'
    import { vOnClickOutside } from '@vueuse/components'
    import { genBody } from './util'

    import smileys_people from './smileys_people.svg'

    const props = defineProps<{
        text: string
    }>()

    const emit = defineEmits<{
        (e: 'update:text', content: any): void
        (e: 'send:message', content: any): void
    }>()

    const open = ref(false)
    const input = ref(props.text)
    const face = smileys_people

    const onSelect = (emoji: Emoji) => {
        input.value += emoji.i
        emit('update:text', input.value)
    }

    const onChangeText = (event: any) => {
        console.log(event)
        if (event.keyCode === 13) {
            sendMessage()
            event.preventDefault()
        } else {
            input.value = event.target.value || ''
            emit('update:text', input.value)
        }
    }

    const closeEmoji = () => {
        open.value = false
    }

    const sendMessage = () => {
        if (input.value) {
            const content = (input.value || '').trim()
            const message = genMessage(content)
            input.value = ''
            emit('send:message', message)
        }
    }

    const genMessage = (content: string) => {
        let body = genBody()
        body.userName = 'qile'
        body.sid = '1111'
        body.content = content
        body.isCreator = true
        return body
    }
</script>

<style lang="scss" scoped>
    .v3-input-emoji-picker {
        * {
            box-sizing: border-box;
        }
        .v3-input-picker-root {
            position: relative;
            .v3-emoji-picker-input {
                width: 100%;
                height: 40px;
                border: 1px solid #999;
                padding-left: 15px;
            }
            .v3-emoji-picker-area {
                display: flex;
                flex-direction: row;
                position: relative;
                .v3-emoji-picker-send {
                    position: absolute;
                    background: #7100ff;
                    border-color: #7100ff;
                    color: #fff;
                    bottom: 8px;
                    right: 8px;
                    padding: 9px 16px;
                    font-size: 14px;
                    border: var(--meet-chat-btn-disabled);
                }
            }
            .v3-emoji-picker-textarea {
                @extend .v3-emoji-picker-input;
                height: 125px;
                resize: none;
                outline: 0;
                padding: 0px 12px 0px 12px;
                font-size: 14px;
                color: var(--main-title-color);
                background: var(--main-bg-color);
                + .v3-input-picker-wrap .v3-input-picker-icon {
                    top: 40px;
                }
            }
            .v3-input-picker-wrap {
                position: relative;
                .v3-input-picker-icon {
                    display: inline-flex;
                    font-size: 24px;
                    border: none;
                    background: none;
                    padding: 0 5px;
                    cursor: pointer;
                    img {
                        display: block;
                        width: 1em;
                        height: 1em;
                    }
                }
                .v3-emoji-picker {
                    position: absolute;
                    /* bottom: 60px; */
                    /* top: -100%; */
                    transform: translate(0, calc(-100% - 30px));
                }
                // .v3-emoji-picker {
                //     opacity: 0;
                //     visibility: hidden;
                //     transition: 200ms;
                // }
                // &.v3-picker-is-open .v3-emoji-picker {
                //     opacity: 1;
                //     visibility: visible;
                //     z-index: 999;
                // }
            }
        }
    }
</style>
