
'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2 } from "lucide-react";
import { guideStudent, GuideStudentOutput } from "@/ai/flows/tp-assistant";
import { TP } from '@/lib/data-manager';

export const TpAssistantDialog = ({ tp }: { tp: TP }) => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAskAssistant = async () => {
        if (!question.trim()) return;

        const newConversation = [...conversation, { role: 'user' as const, content: question }];
        setConversation(newConversation);
        setQuestion('');
        setIsLoading(true);

        try {
            const result: GuideStudentOutput = await guideStudent({
                tpTitle: tp.titre,
                tpObjective: tp.objectif,
                studentQuestion: question,
            });
            
            const assistantResponse = result.guidanceText;

            setConversation(prev => [...prev, { role: 'assistant' as const, content: assistantResponse }]);
        } catch (error) {
            console.error("AI assistant failed", error);
            setConversation(prev => [...prev, { role: 'assistant' as const, content: "Désolé, une erreur est survenue. Veuillez réessayer plus tard." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="print-hidden">
                    <Bot className="mr-2" />
                    Assistant IA
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
                        <Bot /> Assistant Pédagogique IA
                    </DialogTitle>
                    <DialogDescription>
                        Testez l'assistant IA pour le TP "{tp.titre}". Posez des questions comme le ferait un élève.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                     <div className="h-64 overflow-y-auto p-4 bg-background/50 rounded-lg border border-primary/20 space-y-4">
                        {conversation.length === 0 && <p className="text-muted-foreground text-center">Posez une question pour commencer...</p>}
                        {conversation.map((entry, index) => (
                            <div key={index} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-[80%] ${entry.role === 'user' ? 'bg-primary/30' : 'bg-secondary'}`}>
                                    <p className="text-sm">{entry.content}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4"/>
                                    <p className="text-sm text-muted-foreground">Réflexion...</p>
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="flex gap-2">
                        <Textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ex: Par où devrais-je commencer pour l'étape 2 ?"
                            className="flex-grow"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAskAssistant();
                                }
                            }}
                            disabled={isLoading}
                        />
                        <Button onClick={handleAskAssistant} disabled={isLoading || !question.trim()} aria-label="Envoyer la question">
                            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

    
