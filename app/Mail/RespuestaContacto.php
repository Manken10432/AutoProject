<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RespuestaContacto extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Contact $contact,
        public string $replyMessage
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Re: Tu solicitud en AutoGalería',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.respuesta-contacto',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
